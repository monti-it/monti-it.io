import { inflateSync } from 'node:zlib'
import { Buffer } from 'node:buffer'

// resvg only loads TTF/OTF, while @fontsource ships WOFF: WOFF 1.0 is just
// an sfnt whose tables are individually zlib-compressed, so unwrap it back.
// Spec: https://www.w3.org/TR/WOFF/
export const woffToTtf = (woff) => {
  const numTables = woff.readUInt16BE(12)
  const tables = Array.from({ length: numTables }, (_, i) => {
    const entry = 44 + i * 20
    const offset = woff.readUInt32BE(entry + 4)
    const compLength = woff.readUInt32BE(entry + 8)
    const origLength = woff.readUInt32BE(entry + 12)
    const raw = woff.subarray(offset, offset + compLength)
    return {
      tag: woff.subarray(entry, entry + 4),
      checksum: woff.readUInt32BE(entry + 16),
      data: compLength < origLength ? inflateSync(raw) : raw
    }
  })

  let searchRange = 1
  let entrySelector = 0
  while (searchRange * 2 <= numTables) {
    searchRange *= 2
    entrySelector++
  }

  const header = Buffer.alloc(12 + 16 * numTables)
  woff.copy(header, 0, 4, 8) // sfnt flavor
  header.writeUInt16BE(numTables, 4)
  header.writeUInt16BE(searchRange * 16, 6)
  header.writeUInt16BE(entrySelector, 8)
  header.writeUInt16BE((numTables - searchRange) * 16, 10)

  const bodies = []
  let offset = header.length
  tables.forEach((table, i) => {
    const entry = 12 + i * 16
    table.tag.copy(header, entry)
    header.writeUInt32BE(table.checksum, entry + 4)
    header.writeUInt32BE(offset, entry + 8)
    header.writeUInt32BE(table.data.length, entry + 12)
    const padded = Buffer.alloc((table.data.length + 3) & ~3)
    table.data.copy(padded)
    bodies.push(padded)
    offset += padded.length
  })

  return Buffer.concat([header, ...bodies])
}
