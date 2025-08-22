import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface TopBarProps {
  title: string;
  showProfile?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ title, showProfile = true }) => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>
        
        {showProfile && user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.totalRides} total rides</p>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;