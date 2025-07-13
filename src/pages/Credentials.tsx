import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  Clock,
  Github,
  Twitter,
  Linkedin,
  Award,
  ExternalLink,
  Download
} from "lucide-react";

interface Credential {
  id: string;
  title: string;
  issuer: string;
  description: string;
  status: 'verified' | 'pending' | 'expired';
  issuedDate: string;
  expiryDate?: string;
  icon: any;
  type: 'social' | 'professional' | 'educational' | 'achievement';
  verificationHash?: string;
}

const credentials: Credential[] = [
  {
    id: '1',
    title: 'GitHub Developer',
    issuer: 'GitHub Inc.',
    description: 'Verified GitHub account with 500+ contributions',
    status: 'verified',
    issuedDate: '2024-01-15',
    icon: Github,
    type: 'social',
    verificationHash: '0xabcd1234...'
  },
  {
    id: '2',
    title: 'Twitter Verified Account',
    issuer: 'Twitter/X',
    description: 'Verified social media presence',
    status: 'pending',
    issuedDate: '2024-01-20',
    icon: Twitter,
    type: 'social'
  },
  {
    id: '3',
    title: 'Blockchain Developer Certification',
    issuer: 'Ethereum Foundation',
    description: 'Certified Solidity smart contract developer',
    status: 'verified',
    issuedDate: '2023-12-10',
    expiryDate: '2025-12-10',
    icon: Award,
    type: 'professional',
    verificationHash: '0xefgh5678...'
  },
  {
    id: '4',
    title: 'DeFi Protocol Contributor',
    issuer: 'Uniswap Labs',
    description: 'Active contributor to Uniswap V4 development',
    status: 'verified',
    issuedDate: '2024-01-05',
    icon: Award,
    type: 'achievement',
    verificationHash: '0xijkl9012...'
  }
];

export default function Credentials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddingCredential, setIsAddingCredential] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const filteredCredentials = credentials.filter(credential => {
    const matchesSearch = credential.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credential.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || credential.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Credentials</h1>
          <p className="text-muted-foreground">
            Manage your verified credentials and achievements
          </p>
        </div>
        
        <Dialog open={isAddingCredential} onOpenChange={setIsAddingCredential}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-gradient-dark text-primary-foreground shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Credential
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Credential</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your accounts to automatically verify credentials
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="justify-start">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" className="justify-start">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Custom
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search credentials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "social" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("social")}
          >
            Social
          </Button>
          <Button
            variant={filterType === "professional" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("professional")}
          >
            Professional
          </Button>
          <Button
            variant={filterType === "achievement" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("achievement")}
          >
            Achievement
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{credentials.length}</p>
                <p className="text-xs text-muted-foreground">Total Credentials</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{credentials.filter(c => c.status === 'verified').length}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{credentials.filter(c => c.status === 'pending').length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {credentials.filter(c => c.type === 'achievement').length}
                </p>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCredentials.map((credential) => (
          <Card key={credential.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-primary transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <credential.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{credential.title}</CardTitle>
                    <CardDescription>{credential.issuer}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(credential.status)}>
                  {getStatusIcon(credential.status)}
                  <span className="ml-1 capitalize">{credential.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {credential.description}
              </p>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Issued:</span>
                  <span>{credential.issuedDate}</span>
                </div>
                {credential.expiryDate && (
                  <div className="flex justify-between">
                    <span>Expires:</span>
                    <span>{credential.expiryDate}</span>
                  </div>
                )}
                {credential.verificationHash && (
                  <div className="flex justify-between">
                    <span>Hash:</span>
                    <code className="text-xs">{credential.verificationHash}</code>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCredentials.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No credentials found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Start by adding your first credential"}
          </p>
          <Button 
            onClick={() => setIsAddingCredential(true)}
            className="bg-gradient-primary hover:bg-gradient-dark text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Credential
          </Button>
        </div>
      )}
    </div>
  );
}