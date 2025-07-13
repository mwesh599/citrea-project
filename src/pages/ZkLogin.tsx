import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Zap, 
  Eye, 
  EyeOff,
  Key,
  Lock,
  Fingerprint,
  QrCode,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function ZkLogin() {
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const apps = [
    {
      id: '1',
      name: 'Uniswap',
      description: 'Decentralized exchange protocol',
      logo: '🦄',
      requirements: ['Wallet connected', 'Age verification'],
      trustScore: 'High'
    },
    {
      id: '2', 
      name: 'Compound',
      description: 'Lending and borrowing protocol',
      logo: '🏦',
      requirements: ['Credit score', 'Income proof'],
      trustScore: 'High'
    },
    {
      id: '3',
      name: 'OpenSea',
      description: 'NFT marketplace',
      logo: '🌊',
      requirements: ['Identity verified', 'Not from restricted region'],
      trustScore: 'Medium'
    }
  ];

  const generateProof = async () => {
    setIsGeneratingProof(true);
    // Simulate proof generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGeneratingProof(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">zkLogin</h1>
        <p className="text-muted-foreground">
          Generate privacy-preserving proofs for seamless DApp authentication
        </p>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Zero-Knowledge Authentication</h2>
              <p className="text-primary-foreground/80">
                Prove your identity without revealing personal information
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5" />
              <span>Instant Verification</span>
            </div>
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5" />
              <span>Cryptographic Proof</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Selection */}
        <Card className="lg:col-span-2 bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Select Application</CardTitle>
            <CardDescription>
              Choose the DApp you want to authenticate with
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {apps.map((app) => (
              <div 
                key={app.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedApp === app.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedApp(app.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{app.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{app.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          app.trustScore === 'High' 
                            ? 'border-green-500/20 text-green-600' 
                            : 'border-yellow-500/20 text-yellow-600'
                        }`}
                      >
                        {app.trustScore} Trust
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Required Proofs:</p>
                      {app.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-primary" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedApp === app.id && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Proof Generation */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5" />
              Generate Proof
            </CardTitle>
            <CardDescription>
              Create your zkProof for authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedApp ? (
              <div className="text-center py-8">
                <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Select an application to generate proof
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Proof Type</Label>
                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="font-medium">Identity Verification</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prove identity without revealing personal data
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Privacy Level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Eye className="w-3 h-3 mr-2" />
                      Standard
                    </Button>
                    <Button variant="default" size="sm" className="justify-start">
                      <EyeOff className="w-3 h-3 mr-2" />
                      Maximum
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={generateProof}
                    disabled={isGeneratingProof}
                    className="w-full bg-gradient-primary hover:bg-gradient-dark text-primary-foreground"
                  >
                    {isGeneratingProof ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Proof
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Security Notice
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                zkLogin proofs are generated locally and never expose your private data. 
                Only cryptographic proofs are shared with applications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}