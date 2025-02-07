import React from 'react';
import { X, Activity, Heart, Footprints, Timer, Flame } from 'lucide-react';
import { DayDetails } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {formatDate(details.date)}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Daily Goals Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Footprints className="w-5 h-5 text-blue-400" />
                <span className="text-gray-200">Steps</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {details.health.steps.toLocaleString()}
              </p>
              <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full transition-all"
                  style={{
                    width: `${getGoalProgress(
                      details.health.steps,
                      details.goals.steps
                    )}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Goal: {details.goals.steps.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-gray-200">Calories</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {details.health.calories}
              </p>
              <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all"
                  style={{
                    width: `${getGoalProgress(
                      details.health.calories,
                      details.goals.calories
                    )}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Goal: {details.goals.calories}
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Timer className="w-5 h-5 text-purple-400" />
                <span className="text-gray-200">Active Minutes</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {details.health.activeMinutes}
              </p>
              <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all"
                  style={{
                    width: `${getGoalProgress(
                      details.health.activeMinutes,
                      details.goals.activeMinutes
                    )}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Goal: {details.goals.activeMinutes}
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-gray-200">Distance</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {details.health.distance} km
              </p>
            </div>
          </div>

          {/* Heart Rate Chart */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Heart Rate
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={details.health.heartRate}>
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
                      {workout.type}
                    </h4>
                    <div className="space-y-2 text-gray-300">
                      <p>Duration: {workout.duration} minutes</p>
                      <p>Calories: {workout.calories} kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mood */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Mood</h3>
            <p className="text-gray-300 capitalize">{details.mood}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
