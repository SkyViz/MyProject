import React from 'react';
import {
  Activity,
  Heart,
  Footprints,
  Timer,
  Flame,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { HealthMetrics } from '../types';

const mockMetrics: HealthMetrics = {
  steps: 8432,
  calories: 420,
  distance: 5.2,
  activeMinutes: 45,
};

const dailyGoals = {
  steps: 10000,
  calories: 500,
  distance: 8,
  activeMinutes: 60,
};

const dailyProgress = [
  {
    name: 'Steps',
    value: (mockMetrics.steps / dailyGoals.steps) * 100,
    fill: '#60A5FA',
    icon: <Footprints className="w-6 h-6" />,
    actual: mockMetrics.steps.toLocaleString(),
    goal: dailyGoals.steps.toLocaleString(),
  },
  {
    name: 'Calories',
    value: (mockMetrics.calories / dailyGoals.calories) * 100,
    fill: '#F97316',
    icon: <Flame className="w-6 h-6" />,
    actual: mockMetrics.calories,
    goal: dailyGoals.calories,
  },
  {
    name: 'Distance',
    value: (mockMetrics.distance / dailyGoals.distance) * 100,
    fill: '#4ADE80',
    icon: <Activity className="w-6 h-6" />,
    actual: `${mockMetrics.distance} km`,
    goal: `${dailyGoals.distance} km`,
  },
  {
    name: 'Active Time',
    value: (mockMetrics.activeMinutes / dailyGoals.activeMinutes) * 100,
    fill: '#A855F7',
    icon: <Timer className="w-6 h-6" />,
    actual: `${mockMetrics.activeMinutes} min`,
    goal: `${dailyGoals.activeMinutes} min`,
  },
];

const weeklyData = [
  { day: 'Mon', steps: 7234, calories: 380, activeMinutes: 35 },
  { day: 'Tue', steps: 8432, calories: 420, activeMinutes: 45 },
  { day: 'Wed', steps: 6543, calories: 350, activeMinutes: 30 },
  { day: 'Thu', steps: 9876, calories: 480, activeMinutes: 55 },
  { day: 'Fri', steps: 7654, calories: 410, activeMinutes: 40 },
  { day: 'Sat', steps: 11234, calories: 520, activeMinutes: 65 },
  { day: 'Sun', steps: 9432, calories: 450, activeMinutes: 50 },
];

const heartRateData = [
  { time: '6am', rate: 62 },
  { time: '9am', rate: 78 },
  { time: '12pm', rate: 72 },
  { time: '3pm', rate: 85 },
  { time: '6pm', rate: 76 },
  { time: '9pm', rate: 68 },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-6">
            Daily Progress
          </h3>
          <div className="flex items-start space-x-4">
            <div className="space-y-4 pt-4">
              {dailyProgress.map((metric) => (
                <div key={metric.name} className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: metric.fill + '20',
                      color: metric.fill,
                    }}
                  >
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {metric.name}
                    </p>
                    <p className="text-lg font-bold text-white">
                      {metric.actual}
                    </p>
                    <p className="text-xs text-gray-400">Goal: {metric.goal}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="30%"
                  outerRadius="100%"
                  data={dailyProgress}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background={{ fill: '#374151' }}
                    dataKey="value"
                    cornerRadius={30}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Heart Rate
              </h3>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
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
                  dataKey="rate"
                  stroke="#F87171"
                  strokeWidth={2}
                  dot={{ fill: '#F87171' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-200">
              Weekly Activity
            </h3>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#E5E7EB' }}
                itemStyle={{ color: '#60A5FA' }}
              />
              <Area
                type="monotone"
                dataKey="steps"
                stroke="#60A5FA"
                fillOpacity={1}
                fill="url(#colorSteps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
