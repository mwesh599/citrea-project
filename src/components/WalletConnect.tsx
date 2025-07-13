'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: 'Address Copied',
        description: 'Wallet address copied to clipboard',
      });
    }
  };

  if (!isConnected) {
    return (
      <ConnectButton
        accountStatus="address"
        chainStatus="none"
        showBalance={false}
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
        <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse mr-2" />
        Connected
      </Badge>
      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardContent className="flex items-center gap-2 p-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Wallet className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAddress}
            className="p-1.5 h-auto hover:bg-accent"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              disconnect();
              toast({
                title: 'Wallet Disconnected',
                description: 'Successfully disconnected from wallet',
              });
            }}
            className="p-1.5 h-auto hover:bg-destructive/10 text-destructive"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
