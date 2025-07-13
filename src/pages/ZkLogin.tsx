import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  AlertTriangle,
  Settings,
  Download,
  Copy,
  ExternalLink,
  Sparkles,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ZkLogin() {
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [proofProgress, setProofProgress] = useState(0);
  const [generatedProof, setGeneratedProof] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const { toast } = useToast();

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
    if (!selectedApp) return;
    
    setIsGeneratingProof(true);
    setProofProgress(0);
    
    // Simulate proof generation with progress
    const steps = [
      { progress: 20, message: "Initializing zkCircuit..." },
      { progress: 40, message: "Generating witness..." },
      { progress: 60, message: "Computing proof..." },
      { progress: 80, message: "Verifying proof..." },
      { progress: 100, message: "Proof ready!" }
    ];
    
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProofProgress(step.progress);
    }
    
    // Generate mock proof hash
    const proofHash = "zk1" + Math.random().toString(36).substring(2, 15) + "..." + Math.random().toString(36).substring(2, 6);
    setGeneratedProof(proofHash);
    setIsGeneratingProof(false);
    
    toast({
      title: "zkProof Generated!",
      description: "Your privacy-preserving proof is ready to use.",
    });
  };

  const copyProof = () => {
    if (generatedProof) {
      navigator.clipboard.writeText(generatedProof);
      toast({
        title: "Proof Copied",
        description: "zkProof hash copied to clipboard",
      });
    }
  };

  const resetProof = () => {
    setGeneratedProof(null);
    setProofProgress(0);
    setSelectedApp(null);
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
            ) : generatedProof ? (
              <div className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Proof Generated!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your zkProof is ready to use
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-xs font-medium">Proof Hash</Label>
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono flex-1 text-muted-foreground">
                        {generatedProof}
                      </code>
                      <Button variant="ghost" size="sm" onClick={copyProof}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Proof Details</Label>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>Identity Verification</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Privacy Level:</span>
                      <span>Maximum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valid Until:</span>
                      <span>{new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={resetProof}>
                    Generate New
                  </Button>
                  <Button variant="default" size="sm" className="bg-gradient-primary">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Use Proof
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Progress Display */}
                {isGeneratingProof && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Generating Proof</span>
                      <span className="text-sm text-muted-foreground">{proofProgress}%</span>
                    </div>
                    <Progress value={proofProgress} className="h-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>
                        {proofProgress < 20 && "Initializing zkCircuit..."}
                        {proofProgress >= 20 && proofProgress < 40 && "Generating witness..."}
                        {proofProgress >= 40 && proofProgress < 60 && "Computing proof..."}
                        {proofProgress >= 60 && proofProgress < 80 && "Verifying proof..."}
                        {proofProgress >= 80 && "Proof ready!"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Proof Type</Label>
                  <div className="p-3 bg-accent rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="font-medium">Identity Verification</span>
                      <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary text-xs">
                        <Sparkles className="w-2 h-2 mr-1" />
                        ZK-SNARK
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Prove identity without revealing personal data using zero-knowledge cryptography
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Privacy Level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start h-auto p-3">
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <Eye className="w-3 h-3" />
                          <span className="text-xs font-medium">Standard</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Basic privacy</span>
                      </div>
                    </Button>
                    <Button variant="default" size="sm" className="justify-start h-auto p-3 bg-gradient-primary">
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <EyeOff className="w-3 h-3" />
                          <span className="text-xs font-medium">Maximum</span>
                        </div>
                        <span className="text-xs text-primary-foreground/80">Zero knowledge</span>
                      </div>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Advanced Settings</Label>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-accent/50 rounded">
                      <span className="text-muted-foreground">Circuit:</span>
                      <span className="ml-1 font-mono">groth16</span>
                    </div>
                    <div className="p-2 bg-accent/50 rounded">
                      <span className="text-muted-foreground">Key Size:</span>
                      <span className="ml-1 font-mono">2048-bit</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={generateProof}
                  disabled={isGeneratingProof}
                  className="w-full bg-gradient-primary hover:bg-gradient-dark text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
                >
                  {isGeneratingProof ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Generating zkProof...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate zkProof
                    </>
                  )}
                </Button>
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