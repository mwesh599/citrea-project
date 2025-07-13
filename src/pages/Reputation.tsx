import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Star,
  Target,
  Activity,
  Calendar,
  Award
} from "lucide-react";

const reputationMetrics = [
  {
    label: "Overall Score",
    value: 2847,
    change: "+156",
    icon: Trophy,
    color: "text-primary"
  },
  {
    label: "Trust Rating",
    value: 9.2,
    change: "+0.3",
    icon: Star,
    color: "text-yellow-600"
  },
  {
    label: "Community Rank",
    value: 42,
    change: "-8",
    icon: Users,
    color: "text-blue-600"
  },
  {
    label: "Achievement Points",
    value: 1205,
    change: "+85",
    icon: Award,
    color: "text-purple-600"
  }
];

const reputationBreakdown = [
  { category: "Technical Skills", score: 920, maxScore: 1000, percentage: 92 },
  { category: "Community Contributions", score: 850, maxScore: 1000, percentage: 85 },
  { category: "Project Delivery", score: 780, maxScore: 1000, percentage: 78 },
  { category: "Code Quality", score: 890, maxScore: 1000, percentage: 89 },
  { category: "Collaboration", score: 760, maxScore: 1000, percentage: 76 }
];

export default function Reputation() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reputation Dashboard</h1>
        <p className="text-muted-foreground">
          Track your reputation across different platforms and communities
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reputationMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className={`text-sm ${metric.change.startsWith('+') ? 'text-primary' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reputation Breakdown */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Reputation Breakdown</CardTitle>
            <CardDescription>
              Your reputation score across different categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {reputationBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {item.score}/{item.maxScore}
                    </span>
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest reputation-affecting activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                action: "Completed DeFi Protocol Integration",
                points: "+25 points",
                time: "2 hours ago",
                category: "Technical Skills"
              },
              {
                action: "Code Review Approved",
                points: "+15 points", 
                time: "1 day ago",
                category: "Code Quality"
              },
              {
                action: "Community Tutorial Published",
                points: "+30 points",
                time: "3 days ago",
                category: "Community Contributions"
              },
              {
                action: "Project Milestone Achieved",
                points: "+40 points",
                time: "1 week ago",
                category: "Project Delivery"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">{item.points}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Platform Rankings */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Platform Rankings</CardTitle>
          <CardDescription>
            Your reputation standing across different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                platform: "GitHub",
                rank: "#42",
                category: "Contributors",
                score: 920,
                trend: "up"
              },
              {
                platform: "Stack Overflow",
                rank: "#156",
                category: "Blockchain Tags",
                score: 2847,
                trend: "up"
              },
              {
                platform: "Discord Communities",
                rank: "#28",
                category: "Active Members",
                score: 1205,
                trend: "down"
              }
            ].map((platform, index) => (
              <div key={index} className="text-center space-y-3 p-4 bg-accent/50 rounded-lg">
                <h3 className="font-semibold">{platform.platform}</h3>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">{platform.rank}</div>
                  <p className="text-sm text-muted-foreground">in {platform.category}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className={`w-3 h-3 ${platform.trend === 'up' ? 'text-primary' : 'text-red-500'}`} />
                  <span className="text-sm">{platform.score} points</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}