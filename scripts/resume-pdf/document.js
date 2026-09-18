import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet
} from '@react-pdf/renderer'

const e = React.createElement

// Darker than the site's --accent-secondary (#fdb022) since that light amber
// reads as low-contrast on a white PDF page — this is print, not the dark UI.
const ACCENT = '#b45309'
const TEXT = '#1a1a1a'
const MUTED = '#555555'
const RULE = '#cccccc'

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 46,
    paddingHorizontal: 44,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: TEXT
  },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold' },
  title: { fontSize: 12, color: ACCENT, marginTop: 2, marginBottom: 5 },
  contactRow: { flexDirection: 'row', marginBottom: 14 },
  contactItem: { fontSize: 9, color: MUTED, marginRight: 14 },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: ACCENT,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    paddingBottom: 3,
    marginTop: 14,
    marginBottom: 7
  },
  paragraph: { marginBottom: 4 },
  twoColumnRow: { flexDirection: 'row' },
  column: { flex: 1 },
  columnGap: { width: 24 },
  bold: { fontFamily: 'Helvetica-Bold' },
  bulletRow: { flexDirection: 'row', marginBottom: 2 },
  bulletMark: { width: 10 },
  bulletText: { flex: 1 },
  notableItem: { marginBottom: 8 },
  notableHeaderRow: { flexDirection: 'row', marginBottom: 2 },
  notableDate: { width: 78, fontFamily: 'Helvetica-Bold' },
  notableCompany: { flex: 1, fontFamily: 'Helvetica-Bold' },
  notableBody: { marginLeft: 78 },
  muted: { color: MUTED },
  careerItem: { flexDirection: 'row', marginBottom: 10 },
  careerDate: { width: 92, fontFamily: 'Helvetica-Bold' },
  careerBody: { flex: 1 },
  careerHeaderLine: { marginBottom: 1 },
  careerRole: { color: MUTED, fontStyle: 'italic', marginBottom: 1 },
  careerLine: { marginBottom: 1 },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 44,
    right: 44,
    fontSize: 8,
    color: MUTED,
    textAlign: 'center'
  }
})

function SectionTitle(text) {
  return e(Text, { style: styles.sectionTitle }, text)
}

function BulletList(items) {
  return e(
    View,
    null,
    items.map((item, index) =>
      e(
        View,
        { key: index, style: styles.bulletRow },
        e(Text, { style: styles.bulletMark }, '•'),
        e(Text, { style: styles.bulletText }, item)
      )
    )
  )
}

function NotableExperience(items) {
  return e(
    View,
    null,
    items.map((item) =>
      e(
        View,
        { key: item.key, style: styles.notableItem, wrap: false },
        e(
          View,
          { style: styles.notableHeaderRow },
          e(Text, { style: styles.notableDate }, item.fr.period),
          e(
            Text,
            { style: styles.notableCompany },
            `${item.company} (${item.fr.sector}) – ${item.location}`
          )
        ),
        e(
          View,
          { style: styles.notableBody },
          e(Text, { style: styles.paragraph }, item.fr.description),
          e(
            Text,
            { style: [styles.paragraph, styles.muted] },
            `Résultats : ${item.fr.results.join(', ')}.`
          ),
          e(
            Text,
            { style: styles.muted },
            `Environnement : ${item.environment.join(', ')}`
          )
        )
      )
    )
  )
}

function CareerHistory(items) {
  return e(
    View,
    null,
    items.map((item, index) =>
      e(
        View,
        { key: index, style: styles.careerItem, wrap: false },
        e(Text, { style: styles.careerDate }, item.period),
        e(
          View,
          { style: styles.careerBody },
          e(
            Text,
            { style: styles.careerHeaderLine },
            e(Text, { style: styles.bold }, item.company),
            ` : ${item.sector} - ${item.location}`
          ),
          e(Text, { style: styles.careerRole }, item.role),
          item.projects
            ? e(Text, { style: styles.careerLine }, `Projet : ${item.projects}`)
            : null,
          item.tasks && item.tasks.length > 0
            ? e(
                View,
                { style: { marginTop: 2, marginBottom: 2 } },
                e(Text, { style: styles.careerLine }, 'Tâches accomplies :'),
                BulletList(item.tasks)
              )
            : null,
          e(
            Text,
            { style: [styles.careerLine, styles.muted] },
            `Environnement : ${item.environment.join(', ')}`
          )
        )
      )
    )
  )
}

export function buildResumeDocument(data) {
  const skillLines = Object.values(data.skills.categories).map((category) =>
    category.items.join(', ')
  )

  return e(
    Document,
    { title: `${data.name} - CV`, author: data.name, language: 'fr' },
    e(
      Page,
      { size: 'A4', style: styles.page },
      e(Text, { style: styles.name }, data.name),
      e(Text, { style: styles.title }, data.title),
      e(
        View,
        { style: styles.contactRow },
        e(
          Link,
          { src: `mailto:${data.contact.email}`, style: styles.contactItem },
          data.contact.email
        ),
        e(
          Link,
          { src: `https://${data.contact.website}`, style: styles.contactItem },
          data.contact.website
        ),
        e(Text, { style: styles.contactItem }, data.contact.phone)
      ),

      SectionTitle('Profil professionnel'),
      e(Text, { style: styles.paragraph }, data.profile.fr),

      e(
        View,
        { style: styles.twoColumnRow },
        e(
          View,
          { style: styles.column },
          SectionTitle('Compétences techniques'),
          BulletList(skillLines)
        ),
        e(View, { style: styles.columnGap }),
        e(
          View,
          { style: styles.column },
          SectionTitle('Soft skills'),
          BulletList(data.additional.softSkills)
        )
      ),

      SectionTitle('Expériences notables'),
      NotableExperience(data.experience),

      e(
        View,
        { style: styles.twoColumnRow },
        e(
          View,
          { style: styles.column },
          SectionTitle('Formation'),
          BulletList(
            data.additional.education.map(
              (item) => `${item.year} : ${item.title} – ${item.institution}`
            )
          )
        ),
        e(View, { style: styles.columnGap }),
        e(
          View,
          { style: styles.column },
          SectionTitle('Langues'),
          BulletList(
            data.languages.map((lang) => `${lang.fr.name} : ${lang.fr.level}`)
          )
        )
      ),

      SectionTitle('Résumé de carrière'),
      CareerHistory(data.additional.careerHistory),

      e(Text, {
        style: styles.footer,
        fixed: true,
        render: ({ pageNumber, totalPages }) =>
          `${data.name} — CV — ${pageNumber} / ${totalPages}`
      })
    )
  )
}
