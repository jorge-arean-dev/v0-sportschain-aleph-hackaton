'use client'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultConfig,
  Theme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  lisk,
  liskSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'SportChain',
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID || '',
  chains: [lisk, liskSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

// Custom theme for RainbowKit to match your btn-primary-filled styling
const customTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(8px)',
  },
  colors: {
    accentColor: '#00ffaa',
    accentColorForeground: '#ffffff',
    actionButtonBorder: 'transparent',
    actionButtonBorderMobile: 'transparent',
    actionButtonSecondaryBackground: 'linear-gradient(135deg, rgba(0, 255, 170, 0.8) 0%, rgba(30, 255, 156, 0.8) 100%)',
    closeButton: '#9ca3af',
    closeButtonBackground: '#0a0f0d',
    connectButtonBackground: 'linear-gradient(135deg, rgba(0, 255, 170, 0.8) 0%, rgba(30, 255, 156, 0.8) 100%)',
    connectButtonBackgroundError: '#ff4d4d',
    connectButtonInnerBackground: 'transparent',
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ffffff',
    connectionIndicator: '#00ffaa',
    downloadBottomCardBackground: '#0a0f0d',
    downloadTopCardBackground: '#0a0f0d',
    error: '#ff4d4d',
    generalBorder: '#1eff9c',
    generalBorderDim: 'rgba(30, 255, 156, 0.3)',
    menuItemBackground: '#0a0f0d',
    modalBackdrop: 'rgba(0, 0, 0, 0.7)',
    modalBackground: '#0a0f0d',
    modalBorder: '#1eff9c',
    modalText: '#d1d5db',
    modalTextDim: '#9ca3af',
    modalTextSecondary: '#9ca3af',
    profileAction: '#1eff9c',
    profileActionHover: 'rgba(30, 255, 156, 0.1)',
    profileForeground: '#0a0f0d',
    selectedOptionBorder: '#00ffaa',
    standby: '#9ca3af',
  },
  fonts: {
    body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  radii: {
    actionButton: '9999px', // fully rounded like btn-primary-filled
    connectButton: '9999px',
    menuButton: '12px',
    modal: '12px',
    modalMobile: '12px',
  },
  shadows: {
    connectButton: '0 0 20px rgba(0, 255, 170, 0.3)',
    dialog: '0 0 30px rgba(0, 255, 170, 0.2)',
    profileDetailsAction: '0 0 15px rgba(0, 255, 170, 0.1)',
    selectedOption: '0 0 15px rgba(0, 255, 170, 0.3)',
    selectedWallet: '0 0 20px rgba(0, 255, 170, 0.3)',
    walletLogo: '0 0 10px rgba(0, 255, 170, 0.2)',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}