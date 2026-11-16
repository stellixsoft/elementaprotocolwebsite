/**
 * Single source of truth for homepage content — swap for CMS/API later.
 * Copy aligned with Figma file "Elementa-App-UI" (Website Design canvas).
 */
export const site = {
  name: 'Elementa',
  tagline: 'A self-custodial wallet for Bitcoin, Solana and EVM networks, by Stellix Soft.',
}


export const navigation = {
  logo: { alt: 'Elementa', src: '/favicon.svg' },
  wordmark: 'Elementa',
  links: [
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'products',
      label: 'Products',
      href: '#blockchain-section',
      children: [
        {
          id: 'blockchains',
          label: 'Blockchains',
          description: 'Explore supported networks and cross-chain bridges.',
          href: '/blockchain',
        },
        {
          id: 'Elementa-wallet',
          label: 'Elementa Wallet',
          description: 'Self-custodial multi-chain wallet with biometric security.',
          href: '/wallet',
        },
      ],
    },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'docs', label: 'Docs', href: '/docs' },
    { id: 'contact', label: 'Contact Us', href: '/contact' },
  ],
  iconActions: [] as Array<{ id: string; label: string; href: string; asset: string }>,
  cta: { label: 'Get in touch', href: '/contact' },
}

export const hero = {
  headlineParts: [
    { text: 'One self-custodial wallet for ', highlight: false },
    { text: 'Bitcoin, Solana & EVM', highlight: true },
    { text: '', highlight: false },
  ],
  subheadline:
    'Elementa is a self-custodial crypto wallet by Stellix Soft. Hold, send, receive and swap assets on Bitcoin, Solana, Ethereum, Polygon, BNB Chain and Avalanche. Your keys never leave your device.',
  primaryCta: { label: 'Launch Wallet', href: '/wallet' },
  secondaryCta: { label: 'Read Documentation', href: '/docs' },
}

export const statsHeading = ''

/** No public metrics yet; publish only verified figures here. */
export const stats: Array<{ id: string; end: number; suffix: string; decimals: number; label: string }> = []

export const blockchainCards = [
  {
    id: 'bc1',
    title: 'Multi-chain in one wallet',
    body: 'Manage Bitcoin, Solana and EVM assets (Ethereum, Polygon, BNB Chain, Avalanche) from a single recovery phrase.',
    iconKey: 'what-is-blockchain',
  },
  {
    id: 'bc2',
    title: 'Swaps with clear quotes',
    body: 'Swap tokens through third-party routing (0x). You see the quote, network fee and minimum received before you confirm.',
    iconKey: 'multichain',
  },
  {
    id: 'bc3',
    title: 'Your keys, on your device',
    body: 'Keys are generated and encrypted on your phone, protected by your password and Face ID. Optional encrypted backup with Sign in with Apple or Google.',
    iconKey: 'security',
  },
]

export const bento = {
  sectionTitle: 'Scalable Cross Chain Infrastructure for DeFi',
  tiles: [
    {
      id: 'swap',
      colSpan: 2,
      rowSpan: 2,
      title: 'Universal Routing Engine',
      description:
        'Our advanced routing engine discovers the fastest and most efficient path for cross chain transactions across multiple blockchain networks.',
      metric: { value: '15ms', label: 'LATENCY' },
      variant: 'large',
    },
    {
      id: 'wallet',
      colSpan: 2,
      title: 'Smart Contract Abstraction',
      description:
        'Simplify blockchain interoperability through smart contract abstraction that enables seamless multi-chain interactions.',
      icon: 'wallet',
    },
    {
      id: 'chains',
      title: 'Integrations',
      stat: '250+',
      caption: 'Active dApps',
    },
    {
      id: 'fees',
      title: 'Gas Optimized',
      stat: '-40%',
      caption: 'Cheaper Transactions',
    },
  ],
}

export const featuredGuide = {
  kicker: 'NEW FEATURE GUIDE',
  title: 'Cross Chain Liquidity Guide for DeFi Builders',
  description:
    'Learn how to leverage omnichain liquidity, optimize cross chain swaps, and build scalable DeFi applications using Elementa Protocol.',
  cta: { label: 'Read the Guide', href: '/docs' },
}

export const seoSection = {
  blocks: [
    {
      id: 'what-is',
      title: 'What is a self-custodial wallet?',
      body: 'A self-custodial wallet keeps your private keys on your own device instead of with a company. Elementa never holds your keys or funds, and cannot move assets without your approval. That also means only you can recover your wallet, using your recovery phrase.',
    },
    {
      id: 'why-elementa',
      title: 'Why Elementa?',
      body: 'Elementa brings Bitcoin, Solana and EVM networks into one wallet, built on Stellix Soft\'s own wallet engine. Optional Profile Sync backs up encrypted wallet settings with Sign in with Apple or Google, and lets you revoke access from lost devices.',
    },
  ],
}

export const socialProof = {
  title: 'Trusted Cross Chain Liquidity Network',
  subtitle: 'Secured and verified by top infrastructure providers',
  partners: [] as Array<{ id: string; name: string }>,
  testimonials: [] as Array<{ id: string; quote: string; author: string; role: string; avatar?: string }>,
}

export const helpSection = {
  titleLead: 'Developer & User ',
  titleAccent: 'Support',
  titleTrail: ' Center',
  subtitleBeforeBreak: "Answers to common questions about the Elementa wallet. Can't find what you need? Contact our support team.",
  searchPlaceholder: 'Search help articles...',
}

export const faq = {
  sectionLabel: 'FAQ',
  items: [
    {
      id: 'faq1',
      question: 'Is Elementa custodial?',
      answer:
        'No. Elementa is self-custodial. Your private keys and recovery phrase are created and stored encrypted on your device. Stellix Soft never has access to them and cannot move your funds.',
      defaultOpen: true,
    },
    {
      id: 'faq2',
      question: 'Which networks does Elementa support?',
      answer:
        'Bitcoin, Solana, Ethereum, Polygon, BNB Chain and Avalanche. We will list new networks here when they are live in the app.',
    },
    {
      id: 'faq3',
      question: 'What happens if I lose my phone?',
      answer:
        'Install Elementa on a new device and restore with your recovery phrase. If you turned on Profile Sync, you can also sign in with Apple or Google to restore your encrypted wallet settings, but you still need your recovery phrase or wallet password.',
    },
    {
      id: 'faq4',
      question: 'How do Buy, Sell and Swap work?',
      answer:
        'Buy and Sell open a checkout run by a licensed third-party provider, whose identity checks and fees apply. Swaps are routed by a third-party service (0x). Availability depends on your country.',
    },
  ],
}

export const community = {
  headline: 'Join the Elementa community',
  subheadline:
    'Follow product updates, ask questions and share feedback with the Elementa team.',
  discord: {
    title: 'Discord',
    description: 'Chat with the team and other Elementa users.',
    cta: 'Join server',
    href: 'https://discord.gg/elementapro',
    members: ['person', 'person2', 'person3'],
    memberCount: '',
  },
  twitter: {
    title: 'Twitter',
    description: 'Follow @Elementapro for breaking news and technical milestones.',
    cta: 'Follow Updates',
    href: 'https://x.com/ElementaPro',
  },
  telegram: {
    title: 'Telegram',
    description: 'Community discussions and regional channels.',
    cta: 'Join Channel',
    href: 'https://t.me/Elementa',
  },
  newsletter: {
    kicker: 'NEWSLETTER',
    title: 'Elementa updates',
    description: 'Occasional emails about new features and supported networks.',
    placeholder: 'you@example.com',
    cta: 'Subscribe',
  },
}
export const ecosystem = {
  sectionTitle: 'The Elementa ecosystem',
  wallet: {
    title: 'Elementa Wallet',
    description:
      'Hold, send, receive and swap assets across Bitcoin, Solana and EVM networks from one self-custodial app.',
    tags: ['Buy', 'Sell', 'Swap'],
  },
  chain: {
    title: 'Elementa Chain',
    description:
      'A planned interoperability network. It is in research and not available yet.',
    status: 'IN RESEARCH',
  },
}



export const footer = {
  brand: 'Elementa',
  copyrightLine: '© 2026 Stellix Soft LLC. Elementa is a product of Stellix Soft. All rights reserved.',
  links: [
    { label: 'TERMS & CONDITION', href: '/terms' },
    { label: 'PRIVACY POLICY', href: '/privacy' },
    { label: 'SUPPORT', href: '/contact' },
  ],
  social: [
    { id: 'twitter', label: 'Twitter', href: 'https://x.com/ElementaPro', asset: 'twitter' },
    { id: 'discord', label: 'Discord', href: 'https://discord.gg/Elementa', asset: 'discord' },
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/Elementa', asset: 'telegram' },
  ],
  cta: { label: 'Get in touch', href: '/contact' },
}


export type HeroContent = typeof hero
export type StatMetric = (typeof stats)[number]
export type BlockchainCard = (typeof blockchainCards)[number]
export type BentoContent = typeof bento
export type FeaturedGuide = typeof featuredGuide
export type SeoSectionContent = typeof seoSection
export type SocialProof = typeof socialProof
export type CommunityContent = typeof community
export type EcosystemContent = typeof ecosystem
export type FooterContent = typeof footer
export type NavigationContent = typeof navigation



