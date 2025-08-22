import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import confetti from 'canvas-confetti';
import { Calendar, Trophy, Zap } from 'lucide-react';

const STORAGE_KEY = 'ride-challenge-progress';
const STORAGE_START_KEY = 'ride-challenge-start';

const WeeklyChallenge = () => {
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
    if (ridesCompleted >= totalRides) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      const newProgress = ridesCompleted + 1;
      setRidesCompleted(newProgress);
      
      if (newProgress >= totalRides) {
        triggerConfetti();
        setShowCelebration(true);
      }
      
      setIsAnimating(false);
    }, 300);
  };

  const handleReset = () => {
    setRidesCompleted(0);
    setShowCelebration(false);
    localStorage.setItem(STORAGE_KEY, '0');
    localStorage.setItem(STORAGE_START_KEY, new Date().toISOString());
    setDaysUntilReset(7);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Weekly Ride Challenge
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete 5 rides this week to earn double rewards!
          </p>
        </div>

        {/* Progress Card */}
        <Card className="p-8 card-glow">
          <div className="space-y-6">
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
                <div className="h-3 bg-progress-bg rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out progress-glow ${
                      isAnimating ? 'animate-pulse' : ''
                    } ${isCompleted ? 'animate-pulse-success' : ''}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-primary-foreground animate-bounce" />
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
                `Start Ride ${ridesCompleted + 1}`
              )}
            </Button>

            {/* Next Challenge Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next challenge starts in {daysUntilReset} days</span>
            </div>
          </div>
        </Card>

        {/* Reset Button (Dev convenience) */}
        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full"
        >
          Reset Challenge
        </Button>

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
    </div>
  );
};

export default WeeklyChallenge;