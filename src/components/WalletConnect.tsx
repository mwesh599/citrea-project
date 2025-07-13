import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wallet, Copy, QrCode, Check, ExternalLink, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface WalletOption {
  name: string;
  icon: string;
  description: string;
  type: 'injected' | 'walletconnect' | 'citrea';
}

const walletOptions: WalletOption[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using browser extension",
    type: "injected"
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan with mobile wallet",
    type: "walletconnect"
  },
  {
    name: "Citrea Wallet",
    icon: "🟢",
    description: "Official Citrea wallet",
    type: "citrea"
  },
  {
    name: "Other Wallets",
    icon: "💼",
    description: "Other EVM compatible wallets",
    type: "injected"
  }
];

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    
    try {
      if (walletType === 'walletconnect') {
        setShowQR(true);
        // Simulate QR code connection
        setTimeout(() => {
          const mockAddress = "0x742d35Cc6633C0532925a3b8F0c5BEFce71E168";
          setAddress(mockAddress);
          setIsConnected(true);
          setIsOpen(false);
          setShowQR(false);
          toast({
            title: "Wallet Connected!",
            description: "Successfully connected via WalletConnect",
          });
        }, 3000);
      } else {
        // Simulate other wallet connections
        setTimeout(() => {
          const mockAddress = "0x742d35Cc6633C0532925a3b8F0c5BEFce71E168";
          setAddress(mockAddress);
          setIsConnected(true);
          setIsOpen(false);
          toast({
            title: "Wallet Connected!",
            description: `Successfully connected to ${walletType}`,
          });
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    });
  };

  if (isConnected) {
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
                {address.slice(0, 6)}...{address.slice(-4)}
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
              onClick={disconnect}
              className="p-1.5 h-auto hover:bg-destructive/10 text-destructive"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-primary hover:bg-gradient-dark text-primary-foreground border-primary/20 shadow-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary-foreground" />
            </div>
            Connect Your Wallet
          </DialogTitle>
        </DialogHeader>
        
        {showQR ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-48 h-48 bg-gradient-glow rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
              <QrCode className="w-24 h-24 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Scan QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Open your mobile wallet and scan this QR code to connect
              </p>
            </div>
            <div className="flex animate-pulse justify-center">
              <div className="w-2 h-2 bg-primary rounded-full mx-1"></div>
              <div className="w-2 h-2 bg-primary rounded-full mx-1"></div>
              <div className="w-2 h-2 bg-primary rounded-full mx-1"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose your preferred wallet to connect to SatoshiID
            </p>
            
            <div className="space-y-2">
              {walletOptions.map((wallet) => (
                <Card 
                  key={wallet.name}
                  className="cursor-pointer hover:shadow-card transition-all duration-200 hover:scale-[1.02] bg-gradient-card border-border/50"
                  onClick={() => connectWallet(wallet.name)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{wallet.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {wallet.description}
                      </p>
                    </div>
                    {isConnecting && (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By connecting, you agree to SatoshiID's{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  Terms of Service
                </span>
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}