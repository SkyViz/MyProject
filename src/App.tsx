import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { WorkoutPage } from './pages/WorkoutPage';
import { HealthPage } from './pages/HealthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AITrainerPage } from './pages/AITrainerPage';
import { supabase } from './lib/supabase';
import { insertSampleData } from './lib/seedData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    
    if (!user) {
      const { error } = await supabase.auth.signUp({
        email: 'demo@example.com',
        password: 'demo12345',
      });
      
      if (!error) {
        // Auto sign in after sign up
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: 'demo@example.com',
          password: 'demo12345',
        });
        
        if (!signInError) {
          setIsAuthenticated(true);
          // Insert sample data after successful authentication
          await insertSampleData();
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="md:ml-64 pb-16 md:pb-0">
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-white">
              Welcome back, Alex!
            </h1>
            <p className="text-gray-400">Track your fitness journey</p>
          </div>
        </div>
        {renderPage()}
      </main>
    </div>
  );

  function renderPage() {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'workouts':
        return <WorkoutPage />;
      case 'health':
        return <HealthPage />;
      case 'profile':
        return <ProfilePage />;
      case 'trainer':
        return <AITrainerPage />;
      default:
        return <Dashboard />;
    }
  }
}

export default App;