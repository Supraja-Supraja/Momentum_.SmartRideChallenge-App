import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Moon, 
  Sun, 
  RotateCcw, 
  LogOut, 
  Info, 
  Shield, 
  Bell,
  Smartphone
} from 'lucide-react';
import TopBar from '@/components/Layout/TopBar';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResetChallenge = () => {
    localStorage.setItem('ride-challenge-progress', '0');
    localStorage.setItem('ride-challenge-start', new Date().toISOString());
    toast({
      title: "Challenge Reset",
      description: "Your weekly challenge has been reset successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen pb-20">
      <TopBar title="Settings" showProfile={false} />
      
      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Theme Settings */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Challenge Settings */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Challenge Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Resetting will clear your current progress and start a new weekly challenge.
              </AlertDescription>
            </Alert>
            
            <Button 
              variant="outline" 
              onClick={handleResetChallenge}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Current Challenge
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Challenge Reminders</p>
                <p className="text-xs text-muted-foreground">
                  Get reminded about weekly challenges
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Achievement Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Get notified about new achievements
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium">Web App</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-medium font-mono text-xs">{user?.id}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start h-auto p-2">
                <Shield className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-sm font-medium">Privacy Policy</div>
                  <div className="text-xs text-muted-foreground">Learn how we protect your data</div>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start h-auto p-2">
                <Smartphone className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-sm font-medium">Terms of Service</div>
                  <div className="text-xs text-muted-foreground">Read our terms and conditions</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;