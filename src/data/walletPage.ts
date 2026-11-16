/**
 * Elementa Wallet product page — copy aligned with Elementa App UI / ecosystem wallet tile.
 * Figma: Hero Section (1145:398) — wallet landing hero.
 */
export const walletHero = {
  headlineParts: [
    { text: 'Elementa Protocol', highlight: true },
    { text: ': Bitcoin, Solana & EVM in one wallet', highlight: false },
  ],
  subheadline:
    'A self-custodial wallet by Stellix Soft for Bitcoin, Solana, Ethereum, Polygon, BNB Chain and Avalanche. Keys stay encrypted on your device.',
  // TODO: replace with the App Store / Google Play listing URLs once live.
  primaryCta: { label: 'Get the app', href: '/contact' },
  secondaryCta: { label: 'View Documentation', href: '/docs' },
}

export type WalletHeroContent = typeof walletHero

export const walletSecurity = {
  title: 'Uncompromising Security Architecture',
  bullets: [
    'Keys and recovery phrase are generated and encrypted on your device.',
    'Wallet password and Face ID protect access; repeated wrong passwords trigger a lockout.',
    'Optional Profile Sync: encrypted backup with Sign in with Apple or Google, with per-device revocation.',
    'Strictly self-custodial: Stellix Soft never holds your keys or funds.',
  ],
}

export const walletFeatures = {
  sectionTitle: 'What Elementa does today',
  sectionSubtitle: 'Bitcoin, Solana and four EVM networks in one self-custodial wallet.',
  items: [
    {
      id: 'wf1',
      title: 'Complete Sovereignty',
      body: 'Your keys, your crypto. Keys are encrypted on your device and never sent to our servers.',
      iconKey: 'shield',
    },
    {
      id: 'wf2',
      title: 'Biometric Authentication',
      body: 'Unlock with Face ID or your wallet password.',
      iconKey: 'fingerprint',
    },
    {
      id: 'wf3',
      title: 'Token Swaps',
      body: 'Swap tokens with quotes from a third-party router (0x). Review the rate, fee and minimum received before you confirm.',
      iconKey: 'swap',
    },
    {
      id: 'wf4',
      title: 'Clear Confirmations',
      body: 'See the network, recipient, amount and fee before every send.',
      iconKey: 'file',
    },
    {
      id: 'wf5',
      title: 'Unified Dashboard',
      body: 'See balances across every supported network in one portfolio view, with market prices for reference.',
      iconKey: 'chart',
    },
    {
      id: 'wf6',
      title: 'Profile Sync Backup',
      body: 'Optionally back up encrypted wallet settings with Sign in with Apple or Google, and revoke lost devices.',
      iconKey: 'key',
    },
  ],
}

/** Wallet-specific FAQ — optional override for HelpFaqSection */
export const walletFaq = {
  sectionLabel: 'Wallet FAQs',
  items: [
    {
      id: 'wfq1',
      question: 'Is the Elementa Wallet fully non-custodial?',
      answer:
        'Yes. Your private keys and recovery phrase are encrypted on your device and never sent to our servers. Stellix Soft cannot access or move your funds.',
      defaultOpen: true,
    },
    {
      id: 'wfq2',
      question: 'Which networks are currently supported?',
      answer:
        'Bitcoin, Solana, Ethereum, Polygon, BNB Chain and Avalanche.',
    },
    {
      id: 'wfq3',
      question: 'Can I connect a hardware wallet?',
      answer:
        'Not yet. Elementa currently works with software keys stored on your phone.',
    },
    {
      id: 'wfq4',
      question: 'What fees do I pay?',
      answer:
        'You pay the blockchain network fee for each transaction. Swaps and Buy/Sell may include fees from the third-party provider, shown before you confirm.',
    },
  ],
}

export const coreCapabilities = {
  title: 'Everything You Need to Manage Your Web3 Assets',
  items: [
    {
      id: 'cc1',
      title: 'Swap Instantly',
      description:
        'Swap tokens using quotes from a third-party router (0x), with the rate, fee and minimum received shown before you confirm.',
      type: 'large',
      iconAsset: 'coreLogo',
    },
    {
      id: 'cc2',
      title: '6 Networks',
      description:
        'Bitcoin, Solana, Ethereum, Polygon, BNB Chain and Avalanche from one wallet.',
      type: 'small',
      iconAsset: 'blockchainLogo',
    },
    {
      id: 'cc3',
      title: 'EVM Pro',
      description:
        'Manage tokens on Ethereum, Polygon, BNB Chain and Avalanche, and import custom tokens.',
      tags: ['ETH', 'EVM'],
      type: 'bottom',
      iconAsset: 'evmLogo',
    },
    {
      id: 'cc4',
      title: 'Bitcoin',
      description:
        'Send and receive bitcoin with the same recovery phrase as your other networks.',
      tags: ['BTC'],
      type: 'bottom',
      iconAsset: 'bitcoinLogo',
    },
    {
      id: 'cc5',
      title: 'Solana Native',
      description:
        'Hold, send and receive SOL and Solana tokens.',
      tags: ['SOL'],
      type: 'bottom',
      iconAsset: 'solanaLogo',
    },
  ],
}

export const powerWalletData = {
  sectionTitle: 'Why Choose Elementa Wallet?',
  items: [
    {
      id: 'pw1',
      title: 'One Recovery Phrase',
      description:
        'Bitcoin, Solana and EVM accounts from a single recovery phrase.',
      iconKey: 'multiChainIcon',
    },
    {
      id: 'pw2',
      title: 'On-Device Security',
      description:
        'Encrypted keys, Face ID and a lockout after repeated wrong passwords.',
      iconKey: 'secureInfraIcon',
    },
    {
      id: 'pw3',
      title: 'Available Where Licensed',
      description:
        'Buy, Sell and Swap are offered only in countries where our partners are licensed.',
      iconKey: 'fastTransactionsIcon',
    },
  ],
}

export const joinWalletData = {
  title: 'Take control of your crypto',
  description:
    'Elementa keeps your keys on your device and your assets across Bitcoin, Solana and EVM networks in one place.',
  primaryCta: 'Download App',
  secondaryCta: 'Know More',
}

export type JoinWalletData = typeof joinWalletData
export type CoreCapabilities = typeof coreCapabilities
export type CoreCapabilityItem = (typeof coreCapabilities.items)[number]
