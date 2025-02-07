import { supabase } from './supabase';

async function generateHeartRateData() {
  const heartRate = [];
  for (let hour = 0; hour < 24; hour++) {
    heartRate.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      value: Math.floor(60 + Math.random() * 30) // Random heart rate between 60-90
    });
  }
  return heartRate;
}

export async function insertSampleData() {
  // Get the first workout type ID (Running)
  const { data: workoutTypes } = await supabase
    .from('workout_types')
    .select('id')
    .eq('name', 'Running')
    .single();

  if (!workoutTypes) {
    console.error('No workout types found');
    return;
  }

  const runningWorkoutTypeId = workoutTypes.id;

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('No authenticated user');
    return;
  }

  // Insert data for January 2025
  for (let day = 1; day <= 31; day++) {
    const date = `2025-01-${day.toString().padStart(2, '0')}`;
    const steps = Math.floor(7000 + Math.random() * 5000); // Random steps between 7000-12000
    
    // Insert daily health metrics
    const { error: healthError } = await supabase
      .from('daily_health_metrics')
      .insert({
        user_id: user.id,
        date,
        steps,
        calories: Math.floor(steps * 0.04), // Approximate calories based on steps
        distance: +(steps * 0.0007).toFixed(2), // Approximate distance in km
        active_minutes: Math.floor(steps * 0.01), // Approximate active minutes
        heart_rate: await generateHeartRateData(),
        mood: ['energetic', 'happy', 'neutral', 'tired'][Math.floor(Math.random() * 4)]
      });

    if (healthError) {
      console.error('Error inserting health metrics:', healthError);
      continue;
    }

    // Add a workout every 3 days
    if (day % 3 === 0) {
      const { error: workoutError } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          workout_type_id: runningWorkoutTypeId,
          duration: Math.floor(30 + Math.random() * 30), // Random duration between 30-60 minutes
          calories: Math.floor(200 + Math.random() * 300), // Random calories between 200-500
          date
        });

      if (workoutError) {
        console.error('Error inserting workout:', workoutError);
      }
    }
  }

  console.log('Sample data inserted successfully');
}