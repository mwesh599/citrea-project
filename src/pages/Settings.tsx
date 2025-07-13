import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell,
  Lock,
  Eye,
  Trash2,
  Download,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      analyticsEnabled: true,
      dataSharing: false
    },
    security: {
      twoFactor: true,
      biometric: false,
      sessionTimeout: 30
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
          <SettingsIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings
          </p>
        </div>
      </div>

      {/* Profile Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your profile information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue="Alex Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" placeholder="Tell us about yourself..." />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Profile Visibility</p>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to other users
              </p>
            </div>
            <Switch
              checked={settings.privacy.profileVisible}
              onCheckedChange={(checked) => updateSetting('privacy', 'profileVisible', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Control how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            email: "Email Notifications",
            push: "Push Notifications", 
            marketing: "Marketing Communications"
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">
                  {key === 'email' && "Receive notifications via email"}
                  {key === 'push' && "Get browser push notifications"}
                  {key === 'marketing' && "Receive product updates and offers"}
                </p>
              </div>
              <Switch
                checked={settings.notifications[key as keyof typeof settings.notifications]}
                onCheckedChange={(checked) => updateSetting('notifications', key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security & Privacy
          </CardTitle>
          <CardDescription>
            Manage your account security and data privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Two-Factor Authentication</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Enhanced security for your account
                </p>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Recommended
                </Badge>
              </div>
            </div>
            <Switch
              checked={settings.security.twoFactor}
              onCheckedChange={(checked) => updateSetting('security', 'twoFactor', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Biometric Authentication</p>
              <p className="text-sm text-muted-foreground">
                Use fingerprint or face ID for quick access
              </p>
            </div>
            <Switch
              checked={settings.security.biometric}
              onCheckedChange={(checked) => updateSetting('security', 'biometric', checked)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              defaultValue={settings.security.sessionTimeout}
              className="w-32"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Analytics & Data Collection</p>
              <p className="text-sm text-muted-foreground">
                Help improve the platform with usage analytics
              </p>
            </div>
            <Switch
              checked={settings.privacy.analyticsEnabled}
              onCheckedChange={(checked) => updateSetting('privacy', 'analyticsEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export or delete your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 w-full mb-2">
                <Download className="w-4 h-4 text-primary" />
                <span className="font-semibold">Export Data</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Download all your identity data and credentials
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 flex-col items-start border-red-200 hover:bg-red-50"
            >
              <div className="flex items-center gap-2 w-full mb-2">
                <Trash2 className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-red-600">Delete Account</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Permanently delete your account and all data
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>
            Developer and experimental features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Developer Mode</p>
              <p className="text-sm text-muted-foreground">
                Enable advanced features and API access
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Beta Features</p>
              <p className="text-sm text-muted-foreground">
                Get early access to new platform features
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Debug Mode</p>
              <p className="text-sm text-muted-foreground">
                Show detailed logs and debug information
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-primary hover:bg-gradient-dark text-primary-foreground shadow-primary">
          Save All Changes
        </Button>
      </div>
    </div>
  );
}