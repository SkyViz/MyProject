export interface WorkoutSession {
  id: string;
  type: 'running' | 'cycling' | 'walking' | 'swimming' | 'strength';
  duration: number; // in minutes
  calories: number;
  date: Date;
}

export interface HealthMetrics {
  steps: number;
  calories: number;
  distance: number; // in kilometers
  activeMinutes: number;
}

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  age: number;
  dailyGoal: {
    steps: number;
    calories: number;
    activeMinutes: number;
  };
}

export interface DayDetails {
  date: string;
  workouts: WorkoutSession[];
  health: {
    steps: number;
    calories: number;
    distance: number;
    activeMinutes: number;
    heartRate: { time: string; value: number }[];
  };
  goals: {
    steps: number;
    calories: number;
    activeMinutes: number;
    workouts: number;
  };
  mood: string;
}
