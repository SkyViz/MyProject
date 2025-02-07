import React from 'react';
import { HealthStats } from '../components/HealthStats';
import { Moon, Sun, Apple, Coffee } from 'lucide-react';

const sleepData = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 6.5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 8.5 },
];

export function HealthPage() {
  return (
    <div className="space-y-8">
      <HealthStats />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Sleep Analysis</h2>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Moon className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Sleep Schedule
              </h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">7.5h</p>
              <p className="text-sm text-gray-400">Avg. sleep time</p>
            </div>
          </div>

          <div className="space-y-4">
            {sleepData.map((day) => (
              <div key={day.day} className="flex items-center">
                <span className="w-12 text-gray-400">{day.day}</span>
                <div className="flex-1 ml-4">
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${(day.hours / 12) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-gray-300">{day.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Nutrition Tracking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Apple className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Calories Intake
              </h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              1,850{' '}
              <span className="text-base font-normal text-gray-400">kcal</span>
            </p>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: '75%' }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">Daily Goal: 2,200 kcal</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Coffee className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Water Intake
              </h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              1.8 <span className="text-base font-normal text-gray-400">L</span>
            </p>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{ width: '60%' }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">Daily Goal: 3.0 L</p>
          </div>
        </div>
      </div>
    </div>
  );
}
