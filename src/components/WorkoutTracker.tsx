import React from 'react';
import {
  Sun as Run,
  Bike,
  SwissFranc as Swim,
  Dumbbell,
  Wallet as Walk,
} from 'lucide-react';

const workoutTypes = [
  { icon: <Run className="w-6 h-6" />, name: 'Running', color: 'bg-red-500' },
  { icon: <Bike className="w-6 h-6" />, name: 'Cycling', color: 'bg-blue-500' },
  {
    icon: <Walk className="w-6 h-6" />,
    name: 'Walking',
    color: 'bg-green-500',
  },
  {
    icon: <Swim className="w-6 h-6" />,
    name: 'Swimming',
    color: 'bg-cyan-500',
  },
  {
    icon: <Dumbbell className="w-6 h-6" />,
    name: 'Strength',
    color: 'bg-purple-500',
  },
];

export function WorkoutTracker() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Start Workout</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {workoutTypes.map((workout) => (
          <button
            key={workout.name}
            className="flex flex-col items-center p-4 rounded-xl bg-gray-800 border border-gray-700 shadow-lg hover:bg-gray-700 transition-colors"
          >
            <div
              className={`${workout.color} p-3 rounded-full text-white mb-3`}
            >
              {workout.icon}
            </div>
            <span className="font-medium text-gray-200">{workout.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
