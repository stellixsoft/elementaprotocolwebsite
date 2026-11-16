# Elementa website

Marketing and legal website for **Elementa**, a self-custodial crypto wallet built and operated by **Stellix Soft LLC** ([stellixsoft.com](https://stellixsoft.com)). Live at [elementaprotocol.com](https://elementaprotocol.com).

Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where content lives

- `src/data/company.ts`: legal entity details (name, state of formation, registered address, support email) used by the footer, legal pages and contact page.
- `src/data/homepage.ts`, `src/data/walletPage.ts`: page copy.
- `src/app/(site)/terms`, `src/app/(site)/privacy`: Terms of Use and Privacy Policy.

## Content rules

Only publish claims that are true of the shipped app today: supported networks, features, metrics, partners, audits and testimonials. App Store review compares this site with the app.
