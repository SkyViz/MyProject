import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function fetchMonthlyHealthMetrics(year: number, month: number) {
  const startDate = new Date(year, month, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

  // First fetch health metrics
  const { data: metrics, error: metricsError } = await supabase
    .from('daily_health_metrics')
    .select(`
      date,
      steps,
      calories,
      distance,
      active_minutes,
      heart_rate,
      mood
    `)
    .gte('date', startDate)
    .lte('date', endDate);

  if (metricsError) {
    console.error('Error fetching health metrics:', metricsError);
    return null;
  }

  // Then fetch workouts for the same period
  const { data: workouts, error: workoutsError } = await supabase
    .from('workouts')
    .select(`
      id,
      date,
      duration,
      calories,
      workout_types (
        name,
        icon,
        color
      )
    `)
    .gte('date', startDate)
    .lte('date', endDate);

  if (workoutsError) {
    console.error('Error fetching workouts:', workoutsError);
    return null;
  }

  // Combine the data
  const workoutsByDate = workouts.reduce((acc, workout) => {
    const date = workout.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(workout);
    return acc;
  }, {} as Record<string, typeof workouts>);

  // Merge health metrics with workouts
  return metrics.map(metric => ({
    ...metric,
    workouts: workoutsByDate[metric.date] || []
  }));
}

export async function fetchDayDetails(date: string) {
  // Fetch health metrics
  const { data: metrics, error: metricsError } = await supabase
    .from('daily_health_metrics')
    .select(`
      date,
      steps,
      calories,
      distance,
      active_minutes,
      heart_rate,
      mood
    `)
    .eq('date', date)
    .single();

  if (metricsError) {
    console.error('Error fetching health metrics:', metricsError);
    return null;
  }

  // Fetch workouts
  const { data: workouts, error: workoutsError } = await supabase
    .from('workouts')
    .select(`
      id,
      duration,
      calories,
      workout_types (
        name,
        icon,
        color
      )
    `)
    .eq('date', date);

  if (workoutsError) {
    console.error('Error fetching workouts:', workoutsError);
    return null;
  }

  // Combine the data
  return {
    ...metrics,
    workouts: workouts || []
  };
}