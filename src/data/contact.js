// Contact details shown on the site. Kept in its own module (rather than
// read from resume.json) so the résumé data - phone number included - never
// ends up in the public bundle; resume.test.js checks the two stay in sync.
export const CONTACT_EMAIL = 'hello@monti-it.io'
