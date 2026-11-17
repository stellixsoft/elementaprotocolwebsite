/**
 * Elementa Wallet store listings (all published by Stellix Soft LLC).
 * Set `appStore` to the App Store URL once Apple approves the iOS app; until then the
 * App Store badge opens the "coming to iPhone" dialog instead of linking out.
 */
export const storeLinks = {
  googlePlay: 'https://play.google.com/store/apps/details?id=com.elementa.wallet',
  microsoftStore: 'https://apps.microsoft.com/detail/9mtbgsr866qp',
  appStore: null as string | null,
} as const

export const availabilityCopy = {
  short: 'Available now on Android and Windows. iPhone app coming soon.',
  iphoneDialogTitle: 'Coming to iPhone soon',
  iphoneDialogMessage:
    "Elementa Wallet is coming to iPhone soon. It's already available on Android and Windows.",
} as const
