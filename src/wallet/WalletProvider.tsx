// src/wallet/WalletProvider.tsx

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';

import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet
} from 'wagmi';

// ✅ Use publicProvider from @wagmi/core (not wagmi/providers/public)
import { publicProvider } from 'wagmi/providers/public';

interface WalletProviderProps {
  children: React.ReactNode;
}

// ✅ Configure chains (you can add more chains like polygon, optimism, etc.)
const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

// ✅ WalletConnect + injected wallets (Metamask, Rainbow, etc.)
const { connectors } = getDefaultWallets({
  appName: 'SatoshiID',
  projectId: 'YOUR_PROJECT_ID', // 🔐 Replace with your actual WalletConnect Project ID
  chains,
});

// ✅ Final wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// ✅ WalletProvider Component
export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProvider;
