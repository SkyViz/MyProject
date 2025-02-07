/*
  # Fitness Tracking Schema

  1. New Tables
    - `workout_types`
      - `id` (uuid, primary key)
      - `name` (text)
      - `icon` (text)
      - `color` (text)
    
    - `workouts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `workout_type_id` (uuid, foreign key to workout_types)
      - `duration` (integer)
      - `calories` (integer)
      - `date` (date)
      - `created_at` (timestamptz)

    - `daily_health_metrics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `date` (date)
      - `steps` (integer)
      - `calories` (integer)
      - `distance` (numeric)
      - `active_minutes` (integer)
      - `heart_rate` (jsonb)
      - `mood` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create workout_types table
CREATE TABLE IF NOT EXISTS workout_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text,
  color text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workout_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workout types are viewable by authenticated users"
  ON workout_types
  FOR SELECT
  TO authenticated
  USING (true);

-- Create workouts table
CREATE TABLE IF NOT EXISTS workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  workout_type_id uuid REFERENCES workout_types NOT NULL,
  duration integer NOT NULL,
  calories integer NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own workouts"
  ON workouts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create daily_health_metrics table
CREATE TABLE IF NOT EXISTS daily_health_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date date NOT NULL,
  steps integer DEFAULT 0,
  calories integer DEFAULT 0,
  distance numeric(5,2) DEFAULT 0,
  active_minutes integer DEFAULT 0,
  heart_rate jsonb DEFAULT '[]'::jsonb,
  mood text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE daily_health_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own health metrics"
  ON daily_health_metrics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default workout types
INSERT INTO workout_types (name, icon, color) VALUES
  ('Running', 'run', '#F87171'),
  ('Cycling', 'bike', '#60A5FA'),
  ('Walking', 'walk', '#34D399'),
  ('Swimming', 'swim', '#38BDF8'),
  ('Strength', 'dumbbell', '#A78BFA')
ON CONFLICT DO NOTHING;