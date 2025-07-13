import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Edit3, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Github,
  Twitter,
  Mail,
  Link,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IdentityField {
  id: string;
  label: string;
  value: string;
  verified: boolean;
  icon: any;
  type: 'text' | 'email' | 'social';
}

export default function Identity() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [identityData, setIdentityData] = useState<IdentityField[]>([
    {
      id: 'displayName',
      label: 'Display Name',
      value: 'Alex Developer',
      verified: true,
      icon: User,
      type: 'text'
    },
    {
      id: 'email',
      label: 'Email Address',
      value: 'alex@example.com',
      verified: true,
      icon: Mail,
      type: 'email'
    },
    {
      id: 'github',
      label: 'GitHub',
      value: '@alexdev',
      verified: true,
      icon: Github,
      type: 'social'
    },
    {
      id: 'twitter',
      label: 'Twitter',
      value: '@alex_builds',
      verified: false,
      icon: Twitter,
      type: 'social'
    }
  ]);

  const identityScore = 850;
  const completionPercentage = 75;
  const walletAddress = "0x742d35Cc6633C0532925a3b8F0c5BEFce71E168";

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Identity Updated",
      description: "Your identity information has been successfully saved.",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const verifyField = (fieldId: string) => {
    setIdentityData(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, verified: true }
          : field
      )
    );
    toast({
      title: "Verification Initiated",
      description: "Please check your email for verification instructions.",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Identity Profile</h1>
          <p className="text-muted-foreground">
            Manage your decentralized identity and verification status
          </p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-gradient-primary hover:bg-gradient-dark text-primary-foreground shadow-primary"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Overview */}
        <Card className="lg:col-span-1 bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
              <AvatarImage src="/api/placeholder/96/96" />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                AD
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{identityData[0].value}</CardTitle>
            <CardDescription>
              Citrea zkEVM Identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Identity Score */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold">Identity Score</span>
              </div>
              <div className="text-3xl font-bold text-primary">{identityScore}</div>
              <Progress value={identityScore / 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {identityScore >= 800 ? 'Excellent' : identityScore >= 600 ? 'Good' : 'Needs Improvement'} identity strength
              </p>
            </div>

            {/* Completion Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            {/* Wallet Address */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Wallet Address</Label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <code className="text-sm flex-1 text-muted-foreground">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </code>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  <Copy className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identity Fields */}
        <Card className="lg:col-span-2 bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Identity Information</CardTitle>
            <CardDescription>
              Manage your verified identity attributes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {identityData.map((field) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <field.icon className="w-4 h-4" />
                    {field.label}
                  </Label>
                  <div className="flex items-center gap-2">
                    {field.verified ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      if (isEditing) {
                        setIdentityData(prev =>
                          prev.map(f => 
                            f.id === field.id 
                              ? { ...f, value: e.target.value }
                              : f
                          )
                        );
                      }
                    }}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  {!field.verified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => verifyField(field.id)}
                      className="border-primary/20 text-primary hover:bg-primary/10"
                    >
                      Verify
                    </Button>
                  )}
                </div>
                
                {field.type === 'social' && field.verified && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Link className="w-3 h-3" />
                    <span>Connected via OAuth</span>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Field */}
            <div className="pt-4 border-t border-border/50">
              <Button 
                variant="outline" 
                className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/10"
              >
                <User className="w-4 h-4 mr-2" />
                Add New Identity Attribute
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification History */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Verification History</CardTitle>
          <CardDescription>
            Track your identity verification timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "GitHub Account Verified",
                timestamp: "2024-01-15 14:30",
                status: "success",
                method: "OAuth Integration"
              },
              {
                action: "Email Address Verified",
                timestamp: "2024-01-14 09:15",
                status: "success",
                method: "Email Confirmation"
              },
              {
                action: "Wallet Connected",
                timestamp: "2024-01-14 09:00",
                status: "success",
                method: "MetaMask Signature"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.method}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Verified
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}