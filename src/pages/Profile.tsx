import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Camera, Edit3, Trophy, Zap, Target, Award } from 'lucide-react';
import TopBar from '@/components/Layout/TopBar';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPicture, setEditPicture] = useState(user?.profilePicture || '');

  if (!user) return null;

  const handleSaveProfile = () => {
    updateUser({ 
      name: editName,
      profilePicture: editPicture 
    });
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const achievements = [
    {
      icon: Trophy,
      title: "Challenge Master",
      description: `${user.challengesCompleted} challenges completed`,
      earned: user.challengesCompleted > 0,
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "Speed Demon",
      description: `${user.totalRides} total rides`,
      earned: user.totalRides >= 10,
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Dedicated Rider",
      description: "Complete first weekly challenge",
      earned: user.challengesCompleted >= 1,
      color: "text-green-500"
    },
    {
      icon: Award,
      title: "Champion",
      description: "Complete 5 weekly challenges",
      earned: user.challengesCompleted >= 5,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <TopBar title="Profile" showProfile={false} />
      
      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="card-glow animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="picture">Profile Picture URL</Label>
                        <Input
                          id="picture"
                          value={editPicture}
                          onChange={(e) => setEditPicture(e.target.value)}
                          placeholder="Enter image URL (optional)"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} className="flex-1">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Lifetime Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <div className="text-3xl font-bold text-primary">{user.totalRides}</div>
                <div className="text-sm text-muted-foreground">Total Rides</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-success/10">
                <div className="text-3xl font-bold text-success">{user.challengesCompleted}</div>
                <div className="text-sm text-muted-foreground">Challenges Won</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      achievement.earned 
                        ? 'bg-success/10 border-success/20' 
                        : 'bg-muted/30 border-border opacity-60'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-success/20' : 'bg-muted'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        achievement.earned ? achievement.color : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-foreground">
                          {achievement.title}
                        </h4>
                        {achievement.earned && (
                          <Badge variant="secondary" className="text-xs">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Trophy className="h-4 w-4 mr-2" />
              View Challenge History
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;