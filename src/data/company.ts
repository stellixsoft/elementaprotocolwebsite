/**
 * Legal entity behind Elementa. Single source of truth for the footer, legal pages and contact page.
 * TODO before release: replace the two bracketed placeholders with Stellix Soft LLC's real details.
 */
export const company = {
  legalName: 'Stellix Soft LLC',
  productName: 'Elementa Protocol',
  /** e.g. "Wyoming" — the state where Stellix Soft LLC is organized. */
  stateOfFormation: '[STATE OF FORMATION]',
  /** Registered postal address, one line. */
  registeredAddress: '[REGISTERED ADDRESS]',
  website: 'https://stellixsoft.com',
  supportEmail: 'info@elementaprotocol.com',
} as const

export const ownershipLine = `${company.productName} is a product of ${company.legalName}.`
