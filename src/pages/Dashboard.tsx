import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  FileText, 
  Trophy, 
  Shield, 
  TrendingUp, 
  Activity,
  Zap,
  CheckCircle,
  ArrowUpRight,
  Plus
} from "lucide-react";

const statsCards = [
  {
    title: "Identity Score",
    value: "850",
    change: "+12%",
    icon: User,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Verified Credentials",
    value: "8",
    change: "+2",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Reputation Points",
    value: "2,847",
    change: "+156",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  },
  {
    title: "zkProofs Generated",
    value: "24",
    change: "+5",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

const recentActivities = [
  {
    type: "credential",
    title: "GitHub Developer Credential Verified",
    description: "Your GitHub developer status has been successfully verified",
    time: "2 hours ago",
    status: "success"
  },
  {
    type: "proof",
    title: "zkProof Generated for DeFi Protocol",
    description: "Privacy-preserving proof generated for Uniswap interaction",
    time: "1 day ago",
    status: "success"
  },
  {
    type: "reputation",
    title: "Reputation Score Updated",
    description: "Your reputation increased by 45 points",
    time: "2 days ago",
    status: "info"
  }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-glow">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to SatoshiID</h1>
          <p className="text-primary-foreground/80 text-lg mb-6">
            Your decentralized identity and reputation platform on Citrea zkEVM
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Credential
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-primary-foreground hover:bg-white/10"
            >
              Generate zkProof
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border/50 shadow-card hover:shadow-primary transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-primary" />
                <span className="text-primary">{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Progress */}
        <Card className="lg:col-span-2 bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Identity Verification Progress</CardTitle>
                <CardDescription>
                  Complete your identity setup to unlock all features
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                75% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">6/8 steps</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-3">
              {[
                { task: "Connect Wallet", completed: true },
                { task: "Verify Email", completed: true },
                { task: "Link GitHub", completed: true },
                { task: "Add Twitter", completed: true },
                { task: "Complete KYC", completed: false },
                { task: "Add Discord", completed: false }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.completed 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted border-2 border-muted-foreground/20'
                  }`}>
                    {item.completed && <CheckCircle className="w-3 h-3" />}
                  </div>
                  <span className={`text-sm ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.task}
                  </span>
                  {item.completed && (
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                      Complete
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-primary' : 
                  activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks to manage your digital identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 w-full">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold">Add Credential</span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                Verify new social accounts or achievements
              </span>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 w-full">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold">Generate zkProof</span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                Create privacy-preserving proofs
              </span>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 w-full">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-semibold">Check Reputation</span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                View your reputation across platforms
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}