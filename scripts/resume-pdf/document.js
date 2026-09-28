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

// Palette derived from the site tokens in src/index.scss. The site is dark, but
// this is print: navy is used for the header band and headings, body text stays
// dark on white. The light amber (--accent-primary #fecb57) is only used on the
// navy band and as a decorative rule; amber *text* on white uses the darker
// #b45309 (AA on white), since #fecb57/#fdb022 are unreadable on paper.
const NAVY = '#0f1829' // --bg-primary
const NAVY_SOFT = '#1b244f' // --bg-secondary
const AMBER = '#fecb57' // --accent-primary
const AMBER_TEXT = '#b45309'
const HEADER_MUTED = '#c9d1ea' // navy-tinted light text on the header band
const TEXT = '#161b2e'
const MUTED = '#4a5578'
const RULE = '#c7cde0' // --border (#2a3563) lightened for a white page

const PAGE_PADDING_TOP = 40
const PAGE_PADDING_X = 44

const styles = StyleSheet.create({
  page: {
    paddingTop: PAGE_PADDING_TOP,
    paddingBottom: 46,
    paddingHorizontal: PAGE_PADDING_X,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: TEXT
  },
  headerBand: {
    marginTop: -PAGE_PADDING_TOP,
    marginHorizontal: -PAGE_PADDING_X,
    paddingTop: 34,
    paddingBottom: 17,
    paddingHorizontal: PAGE_PADDING_X,
    backgroundColor: NAVY,
    borderBottomWidth: 3,
    borderBottomColor: AMBER
  },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  title: { fontSize: 12, color: AMBER, marginTop: 2, marginBottom: 5 },
  contactRow: { flexDirection: 'row' },
  contactItem: {
    fontSize: 9,
    color: HEADER_MUTED,
    marginRight: 14,
    textDecoration: 'none'
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: NAVY_SOFT,
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
  bulletMark: { width: 10, color: AMBER_TEXT },
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
      e(
        View,
        { style: styles.headerBand },
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
            {
              src: `https://${data.contact.website}`,
              style: styles.contactItem
            },
            data.contact.website
          ),
          e(Text, { style: styles.contactItem }, data.contact.phone)
        )
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

      e(
        View,
        { break: true },
        SectionTitle('Résumé de carrière'),
        CareerHistory(data.additional.careerHistory)
      ),

      e(Text, {
        style: styles.footer,
        fixed: true,
        render: ({ pageNumber, totalPages }) =>
          `${data.name} — CV — ${pageNumber} / ${totalPages}`
      })
    )
  )
}
