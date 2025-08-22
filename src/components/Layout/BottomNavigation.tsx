import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                "hover:bg-accent hover:scale-105",
                isActive 
                  ? "text-primary bg-primary/10 scale-105" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1 transition-all duration-200",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;