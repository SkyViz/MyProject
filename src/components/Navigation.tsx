import React from 'react';
import { LayoutDashboard, Activity, Heart, User, Bot } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 md:px-0 md:left-0 md:top-0 md:w-64 md:h-screen md:border-r">
      <div className="flex md:flex-col md:h-full">
        <div className="hidden md:flex items-center p-4 border-b border-gray-700">
          <Activity className="w-8 h-8 text-blue-400" />
          <span className="ml-2 text-xl font-bold text-white">FitTrack</span>
        </div>

        <ul className="flex justify-around w-full py-2 md:py-6 md:flex-col md:space-y-2">
          <NavItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => onPageChange('dashboard')}
          />
          <NavItem
            icon={<Activity />}
            label="Workouts"
            active={currentPage === 'workouts'}
            onClick={() => onPageChange('workouts')}
          />
          <NavItem
            icon={<Heart />}
            label="Health"
            active={currentPage === 'health'}
            onClick={() => onPageChange('health')}
          />
          <NavItem
            icon={<Bot />}
            label="AI Trainer"
            active={currentPage === 'trainer'}
            onClick={() => onPageChange('trainer')}
          />
          <NavItem
            icon={<User />}
            label="Profile"
            active={currentPage === 'profile'}
            onClick={() => onPageChange('profile')}
          />
        </ul>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex flex-col md:flex-row items-center p-2 md:p-3 rounded-lg
          ${
            active
              ? 'text-blue-400 bg-gray-700'
              : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
          }`}
      >
        <span className="w-6 h-6">{icon}</span>
        <span className="text-xs md:text-sm md:ml-3">{label}</span>
      </button>
    </li>
  );
}
