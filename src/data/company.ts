/**
 * Legal entity behind Elementa. Single source of truth for the footer, legal pages and contact page.
 * Update here if the company's address or contact details change.
 */
export const company = {
  legalName: 'Stellix Soft LLC',
  productName: 'Elementa Protocol',
  /** State where Stellix Soft LLC is organized. */
  stateOfFormation: 'Texas',
  /** Business address, one line. */
  registeredAddress: 'Houston, Texas, United States',
  phone: '+1 (847) 496-9803',
  website: 'https://stellixsoft.com',
  supportEmail: 'info@elementaprotocol.com',
} as const

export const ownershipLine = `${company.productName} is a product of ${company.legalName}.`
