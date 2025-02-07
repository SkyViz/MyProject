import React, { useState, useEffect } from 'react';
import { WorkoutTracker } from '../components/WorkoutTracker';
import { 
  ChevronLeft, 
  ChevronRight,
  Footprints,
  Flame,
} from 'lucide-react';
import { DayDetailsModal } from '../components/DayDetailsModal';
import { fetchMonthlyHealthMetrics, fetchDayDetails } from '../lib/supabase';

interface DailyMetrics {
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
}

export function WorkoutPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState<Record<string, DailyMetrics>>({});
  const [selectedDayDetails, setSelectedDayDetails] = useState<DailyMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMonthData();
  }, [currentDate]);

  const loadMonthData = async () => {
    setLoading(true);
    const metrics = await fetchMonthlyHealthMetrics(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );

    if (metrics) {
      const dataByDate = metrics.reduce((acc, metric) => {
        acc[metric.date] = metric;
        return acc;
      }, {} as Record<string, DailyMetrics>);
      setMonthlyData(dataByDate);
    }
    setLoading(false);
  };

  const getActivityColor = (steps: number): string => {
    if (steps >= 10000) return 'bg-green-500/20 border-green-500/50 text-green-400';
    if (steps >= 7500) return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    if (steps >= 5000) return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
    if (steps > 0) return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
    return 'bg-gray-700 text-gray-400';
  };

  const getDayClass = (dateStr: string) => {
    const dayData = monthlyData[dateStr];
    const steps = dayData?.steps || 0;
    const colorClass = getActivityColor(steps);
    
    return `aspect-square rounded-lg cursor-pointer transition-all duration-200 flex flex-col p-2 text-left h-20 border-2 ${colorClass} hover:brightness-110`;
  };

  const handleDayClick = async (date: string) => {
    const details = await fetchDayDetails(date);
    if (details) {
      setSelectedDayDetails(details);
      setSelectedDate(date);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatMetric = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const getDayMetrics = (dateStr: string) => {
    const dayData = monthlyData[dateStr];
    if (!dayData) return null;
    
    return {
      steps: formatMetric(dayData.steps),
      calories: formatMetric(dayData.calories),
    };
  };

  return (
    <div className="space-y-8">
      <WorkoutTracker />

      <div className="p-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-semibold text-gray-200">
                {currentDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
                <span className="text-sm text-gray-400">10k+ steps</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/50" />
                <span className="text-sm text-gray-400">7.5k+ steps</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500/50" />
                <span className="text-sm text-gray-400">5k+ steps</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-gray-400 font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => {
                  const date = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    i + 1
                  );
                  const dateStr = date.toISOString().split('T')[0];
                  const metrics = getDayMetrics(dateStr);

                  return (
                    <button
                      key={i}
                      onClick={() => handleDayClick(dateStr)}
                      className={getDayClass(dateStr)}
                    >
                      <span className="text-sm font-medium">{i + 1}</span>
                      {metrics && (
                        <div className="flex flex-col gap-1 mt-1 text-[10px]">
                          <div className="flex items-center gap-1">
                            <Footprints className="w-3 h-3" />
                            <span>{metrics.steps}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            <span>{metrics.calories}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedDate && selectedDayDetails && (
        <DayDetailsModal
          details={selectedDayDetails}
          onClose={() => {
            setSelectedDate(null);
            setSelectedDayDetails(null);
          }}
        />
      )}
    </div>
  );
}