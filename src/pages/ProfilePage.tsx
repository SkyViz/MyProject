import React from 'react';
import { Settings, Medal, Trophy, Target, Edit2 } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: '7 Day Streak',
    description: 'Completed workouts for 7 days in a row',
    icon: <Trophy className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 2,
    title: 'Early Bird',
    description: 'Completed 5 morning workouts',
    icon: <Medal className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 3,
    title: 'Goal Crusher',
    description: 'Reached daily step goal 10 times',
    icon: <Target className="w-6 h-6 text-green-400" />,
  },
];

export function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="p-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">A</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Alex Johnson</h2>
                <p className="text-gray-400">Fitness Enthusiast</p>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400">Height</p>
              <p className="text-lg font-semibold text-white">175 cm</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400">Weight</p>
              <p className="text-lg font-semibold text-white">68 kg</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400">Age</p>
              <p className="text-lg font-semibold text-white">28</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400">BMI</p>
              <p className="text-lg font-semibold text-white">22.2</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">App Settings</span>
            </div>
            <button className="text-blue-400 hover:text-blue-300">
              Configure
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-3">
                {achievement.icon}
                <h3 className="text-lg font-semibold text-gray-200">
                  {achievement.title}
                </h3>
              </div>
              <p className="text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
