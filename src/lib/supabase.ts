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

  const { data: metrics, error } = await supabase
    .from('daily_health_metrics')
    .select(`
      date,
      steps,
      calories,
      distance,
      active_minutes,
      heart_rate,
      mood,
      workouts (
        id,
        workout_type_id,
        duration,
        calories,
        workout_types (
          name,
          icon,
          color
        )
      )
    `)
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) {
    console.error('Error fetching health metrics:', error);
    return null;
  }

  return metrics;
}

export async function fetchDayDetails(date: string) {
  const { data, error } = await supabase
    .from('daily_health_metrics')
    .select(`
      date,
      steps,
      calories,
      distance,
      active_minutes,
      heart_rate,
      mood,
      workouts (
        id,
        workout_type_id,
        duration,
        calories,
        workout_types (
          name,
          icon,
          color
        )
      )
    `)
    .eq('date', date)
    .single();

  if (error) {
    console.error('Error fetching day details:', error);
    return null;
  }

  return data;
}