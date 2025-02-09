import React from 'react';
import { X, Activity, Heart, Footprints, Timer, Flame, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface DayDetails {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  active_minutes: number;
  heart_rate: { time: string; value: number }[];
  mood?: string;
  workouts: {
    id: string;
    duration: number;
    calories: number;
    workout_types: {
      name: string;
      icon: string;
      color: string;
    };
  }[];
  goals: {
    steps: number;
    calories: number;
    activeMinutes: number;
    workouts: number;
  };
}

interface DayDetailsModalProps {
  details: DayDetails;
  onClose: () => void;
}

export function DayDetailsModal({ details, onClose }: DayDetailsModalProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGoalProgress = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood?.toLowerCase()) {
      case 'energetic':
        return '💪';
      case 'happy':
        return '😊';
      case 'neutral':
        return '😐';
      case 'tired':
        return '😴';
      default:
        return '😊';
    }
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 isolate">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/75">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {formatDate(details.date)}
                </h2>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span>{getMoodEmoji(details.mood || '')} Feeling {details.mood}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Daily Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  icon={<Footprints className="w-5 h-5 text-blue-400" />}
                  title="Steps"
                  value={details.steps.toLocaleString()}
                  progress={getGoalProgress(details.steps, details.goals.steps)}
                  goal={details.goals.steps.toLocaleString()}
                  color="blue"
                />
                <MetricCard
                  icon={<Flame className="w-5 h-5 text-orange-400" />}
                  title="Calories"
                  value={details.calories.toString()}
                  progress={getGoalProgress(details.calories, details.goals.calories)}
                  goal={details.goals.calories.toString()}
                  color="orange"
                />
                <MetricCard
                  icon={<Timer className="w-5 h-5 text-purple-400" />}
                  title="Active Minutes"
                  value={details.active_minutes.toString()}
                  progress={getGoalProgress(details.active_minutes, details.goals.activeMinutes)}
                  goal={details.goals.activeMinutes.toString()}
                  color="purple"
                />
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span className="text-gray-200">Distance</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {details.distance} km
                  </p>
                  <div className="mt-2 text-sm text-gray-400">
                    Average pace: {(details.active_minutes / details.distance).toFixed(1)} min/km
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Heart Rate Chart */}
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-gray-200">Heart Rate</h3>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={details.heart_rate}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                          }}
                          labelStyle={{ color: '#E5E7EB' }}
                          itemStyle={{ color: '#F87171' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#F87171"
                          strokeWidth={2}
                          dot={{ fill: '#F87171' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Activity Distribution */}
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-gray-200">Activity Distribution</h3>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { time: '00:00', activity: 10 },
                          { time: '06:00', activity: 30 },
                          { time: '12:00', activity: 80 },
                          { time: '18:00', activity: 50 },
                          { time: '23:59', activity: 20 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="activity"
                          stroke="#60A5FA"
                          fill="#60A5FA"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Workouts */}
              {details.workouts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">Workouts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.workouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="bg-gray-700/50 rounded-lg p-4"
                      >
                        <h4 className="text-lg font-medium text-gray-200 capitalize mb-2">
                          {workout.workout_types.name}
                        </h4>
                        <div className="space-y-2 text-gray-300">
                          <p>Duration: {workout.duration} minutes</p>
                          <p>Calories: {workout.calories} kcal</p>
                          <p>Intensity: {Math.round(workout.calories / workout.duration)} kcal/min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  progress: number;
  goal: string;
  color: 'blue' | 'orange' | 'purple' | 'green';
}

function MetricCard({ icon, title, value, progress, goal, color }: MetricCardProps) {
  const colors = {
    blue: 'bg-blue-400',
    orange: 'bg-orange-400',
    purple: 'bg-purple-400',
    green: 'bg-green-400',
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <span className="text-gray-200">{title}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} rounded-full transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-1">Goal: {goal}</p>
    </div>
  );
}