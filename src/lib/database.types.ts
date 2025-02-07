export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      workout_types: {
        Row: {
          id: string
          name: string
          icon: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string | null
          color?: string | null
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          workout_type_id: string
          duration: number
          calories: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workout_type_id: string
          duration: number
          calories: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workout_type_id?: string
          duration?: number
          calories?: number
          date?: string
          created_at?: string
        }
      }
      daily_health_metrics: {
        Row: {
          id: string
          user_id: string
          date: string
          steps: number
          calories: number
          distance: number
          active_minutes: number
          heart_rate: Json
          mood: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          steps?: number
          calories?: number
          distance?: number
          active_minutes?: number
          heart_rate?: Json
          mood?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          steps?: number
          calories?: number
          distance?: number
          active_minutes?: number
          heart_rate?: Json
          mood?: string | null
          created_at?: string
        }
      }
    }
  }
}