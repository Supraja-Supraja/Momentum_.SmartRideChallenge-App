import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import confetti from 'canvas-confetti';
import { Calendar, Trophy, Zap, Target } from 'lucide-react';
import TopBar from '@/components/Layout/TopBar';
import BottomNavigation from '@/components/Layout/BottomNavigation';

const STORAGE_KEY = 'ride-challenge-progress';
const STORAGE_START_KEY = 'ride-challenge-start';

const Home = () => {
  const { user, updateUser } = useAuth();
  const [ridesCompleted, setRidesCompleted] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [daysUntilReset, setDaysUntilReset] = useState(7);

  const totalRides = 5;
  const progressPercentage = (ridesCompleted / totalRides) * 100;
  const isCompleted = ridesCompleted >= totalRides;

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    const savedStart = localStorage.getItem(STORAGE_START_KEY);
    
    if (savedProgress) {
      setRidesCompleted(parseInt(savedProgress, 10));
    }
    
    // Check if we need to reset (weekly cycle)
    if (savedStart) {
      const startDate = new Date(savedStart);
      const now = new Date();
      const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceStart >= 7) {
        // Reset the challenge
        setRidesCompleted(0);
        localStorage.setItem(STORAGE_KEY, '0');
        localStorage.setItem(STORAGE_START_KEY, now.toISOString());
        setDaysUntilReset(7);
      } else {
        setDaysUntilReset(7 - daysSinceStart);
      }
    } else {
      // First time - set start date
      localStorage.setItem(STORAGE_START_KEY, new Date().toISOString());
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, ridesCompleted.toString());
  }, [ridesCompleted]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#A855F7', '#C084FC', '#10B981', '#34D399']
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#A855F7', '#C084FC']
      });
    }, 250);
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10B981', '#34D399', '#059669']
      });
    }, 400);
  };

  const handleStartRide = () => {
    if (ridesCompleted >= totalRides || !user) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      const newProgress = ridesCompleted + 1;
      setRidesCompleted(newProgress);
      
      // Update user's total rides
      updateUser({ 
        totalRides: user.totalRides + 1,
        challengesCompleted: newProgress >= totalRides ? user.challengesCompleted + 1 : user.challengesCompleted
      });
      
      if (newProgress >= totalRides) {
        triggerConfetti();
        setShowCelebration(true);
      }
      
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen pb-20">
      <TopBar title="Weekly Challenge" />
      
      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Challenge Header */}
        <div className="text-center space-y-3 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Weekly Ride Challenge
            </h2>
          </div>
          <p className="text-muted-foreground">
            Complete 5 rides this week to earn double rewards!
          </p>
        </div>

        {/* Progress Card */}
        <Card className="p-6 card-glow animate-slide-up">
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-primary/10">
                <div className="text-2xl font-bold text-primary">{ridesCompleted}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-foreground">{totalRides - ridesCompleted}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="text-sm font-bold text-foreground">
                  {ridesCompleted}/{totalRides} rides
                </span>
              </div>
              
              <div className="relative">
                <div className="h-4 bg-progress-bg rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out progress-glow ${
                      isAnimating ? 'animate-pulse' : ''
                    } ${isCompleted ? 'animate-pulse-success' : ''}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary-foreground animate-bounce" />
                  </div>
                )}
              </div>
            </div>

            {/* Ride Button */}
            <Button
              onClick={handleStartRide}
              disabled={isCompleted}
              className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
                isCompleted 
                  ? 'bg-gradient-success hover:bg-gradient-success' 
                  : 'bg-gradient-primary hover:bg-gradient-primary hover:scale-105'
              } ${isAnimating ? 'scale-95' : ''}`}
            >
              {isCompleted ? (
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Challenge Complete!
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Start Ride {ridesCompleted + 1}
                </div>
              )}
            </Button>

            {/* Next Challenge Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next challenge starts in {daysUntilReset} days</span>
            </div>
          </div>
        </Card>

        {/* Weekly Stats */}
        <Card className="p-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-foreground mb-3">This Week</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{user?.totalRides || 0}</div>
              <div className="text-xs text-muted-foreground">Total Rides</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">{user?.challengesCompleted || 0}</div>
              <div className="text-xs text-muted-foreground">Challenges</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{daysUntilReset}</div>
              <div className="text-xs text-muted-foreground">Days Left</div>
            </div>
          </div>
        </Card>

        {/* Celebration Dialog */}
        <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-foreground">
                🎉 Congratulations! 🎉
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-center">
              <div className="p-6 rounded-full bg-gradient-success mx-auto w-fit">
                <Trophy className="h-12 w-12 text-success-foreground animate-bounce" />
              </div>
              <p className="text-lg font-medium text-foreground">
                You've unlocked Double Rewards!
              </p>
              <p className="text-muted-foreground">
                Amazing work completing 5 rides this week. Your dedication has paid off!
              </p>
              <Button
                onClick={() => setShowCelebration(false)}
                className="w-full bg-gradient-success hover:bg-gradient-success"
              >
                Awesome!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;