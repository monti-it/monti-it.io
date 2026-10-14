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

// Fixed labels of the layout, per language. French typography puts a space
// before a colon, English doesn't.
const LABELS = {
  fr: {
    document: 'CV',
    profile: 'Profil professionnel',
    technicalSkills: 'Compétences techniques',
    softSkills: 'Soft skills',
    notableExperience: 'Expériences notables',
    education: 'Formation',
    languages: 'Langues',
    careerHistory: 'Résumé de carrière',
    results: 'Résultats',
    environment: 'Environnement',
    project: 'Projet',
    tasks: 'Tâches accomplies',
    colon: ' : '
  },
  en: {
    document: 'Resume',
    profile: 'Profile',
    technicalSkills: 'Technical skills',
    softSkills: 'Soft skills',
    notableExperience: 'Notable experience',
    education: 'Education',
    languages: 'Languages',
    careerHistory: 'Career history',
    results: 'Results',
    environment: 'Environment',
    project: 'Project',
    tasks: 'Tasks',
    colon: ': '
  }
}

export const RESUME_LANGUAGES = Object.keys(LABELS)

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
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  title: {
    fontSize: 12,
    color: AMBER,
    marginTop: 2,
    marginBottom: 5,
    textAlign: 'center'
  },
  contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  contactItem: {
    fontSize: 9,
    color: HEADER_MUTED,
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

function NotableExperience(items, lang, labels) {
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
          e(Text, { style: styles.notableDate }, item[lang].period),
          e(
            Text,
            { style: styles.notableCompany },
            `${item.company} (${item[lang].sector}) – ${item.location}`
          )
        ),
        e(
          View,
          { style: styles.notableBody },
          e(Text, { style: styles.paragraph }, item[lang].description),
          e(
            Text,
            { style: [styles.paragraph, styles.muted] },
            `${labels.results}${labels.colon}${item[lang].results.join(', ')}.`
          ),
          e(
            Text,
            { style: styles.muted },
            `${labels.environment}${labels.colon}${item.environment.join(', ')}`
          )
        )
      )
    )
  )
}

function CareerHistory(items, lang, labels) {
  return e(
    View,
    null,
    items.map((entry, index) => {
      // Language-neutral fields, then the language's own (a block may override
      // `environment` when it isn't just proper nouns).
      const item = { ...entry, ...entry[lang] }
      return e(
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
            `${labels.colon}${item.sector} - ${item.location}`
          ),
          e(Text, { style: styles.careerRole }, item.role),
          item.projects
            ? e(
                Text,
                { style: styles.careerLine },
                `${labels.project}${labels.colon}${item.projects}`
              )
            : null,
          item.tasks && item.tasks.length > 0
            ? e(
                View,
                { style: { marginTop: 2, marginBottom: 2 } },
                e(
                  Text,
                  { style: styles.careerLine },
                  `${labels.tasks}${labels.colon.trimEnd()}`
                ),
                BulletList(item.tasks)
              )
            : null,
          e(
            Text,
            { style: [styles.careerLine, styles.muted] },
            `${labels.environment}${labels.colon}${item.environment.join(', ')}`
          )
        )
      )
    })
  )
}

export function buildResumeDocument(data, lang) {
  const labels = LABELS[lang]
  if (!labels) {
    throw new Error(
      `Unknown résumé language "${lang}" (expected ${RESUME_LANGUAGES.join(', ')})`
    )
  }
  const skillLines = Object.values(data.skills.categories).map((category) =>
    category.items.join(', ')
  )

  return e(
    Document,
    {
      title: `${data.name} - ${labels.document}`,
      author: data.name,
      language: lang
    },
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
          e(
            Link,
            {
              src: `tel:${data.contact.phone.replace(/\s/g, '')}`,
              style: styles.contactItem
            },
            data.contact.phone
          )
        )
      ),

      SectionTitle(labels.profile),
      e(Text, { style: styles.paragraph }, data.profile[lang]),

      e(
        View,
        { style: styles.twoColumnRow },
        e(
          View,
          { style: styles.column },
          SectionTitle(labels.technicalSkills),
          BulletList(skillLines)
        ),
        e(View, { style: styles.columnGap }),
        e(
          View,
          { style: styles.column },
          SectionTitle(labels.softSkills),
          BulletList(data.additional.softSkills[lang])
        )
      ),

      SectionTitle(labels.notableExperience),
      NotableExperience(data.experience, lang, labels),

      e(
        View,
        { style: styles.twoColumnRow },
        e(
          View,
          { style: styles.column },
          SectionTitle(labels.education),
          BulletList(
            data.additional.education.map(
              (item) =>
                `${item.year}${labels.colon}${item[lang].title} – ${item.institution}`
            )
          )
        ),
        e(View, { style: styles.columnGap }),
        e(
          View,
          { style: styles.column },
          SectionTitle(labels.languages),
          BulletList(
            data.languages.map(
              (item) => `${item[lang].name}${labels.colon}${item[lang].level}`
            )
          )
        )
      ),

      e(
        View,
        { break: true },
        SectionTitle(labels.careerHistory),
        CareerHistory(data.additional.careerHistory, lang, labels)
      ),

      e(Text, {
        style: styles.footer,
        fixed: true,
        render: ({ pageNumber, totalPages }) =>
          `${data.name} — ${labels.document} — ${pageNumber} / ${totalPages}`
      })
    )
  )
}
