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
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet], // Add more chains like polygon, optimism, etc.
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'SatoshiID',
  projectId: 'YOUR_PROJECT_ID', // 🔐 Replace with your WalletConnect ID
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
