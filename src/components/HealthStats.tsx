import React from 'react';
import { Heart, TrendingUp, Activity } from 'lucide-react';

export function HealthStats() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Health Overview</h2>
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-gray-200">Heart Rate</h3>
          </div>
          <div className="h-40 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <p className="text-3xl font-bold text-white">
              72{' '}
              <span className="text-base font-normal text-gray-400">BPM</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Weekly Progress
              </h3>
            </div>
            <div className="h-40 bg-gray-700/50 rounded-lg"></div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Activity Trends
              </h3>
            </div>
            <div className="h-40 bg-gray-700/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
