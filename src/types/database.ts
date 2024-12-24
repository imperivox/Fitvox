export interface Exercise {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  category: string | null;
  is_custom: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  equipment?: string;
  target_muscle?: string;
  gif_url?: string;
}

export interface Workout {
  id: string;
  user_id: string;
  name: string | null;
  notes: string | null;
  start_time: string;
  end_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_id: string;
  user_id: string;
  set_number: number;
  reps: number | null;
  weight: number | null;
  rest_time: string | null;
  notes: string | null;
  created_at: string;
}

export interface ExerciseGoal {
  id: string;
  user_id: string;
  exercise_id: string;
  target_weight: number | null;
  target_reps: number | null;
  target_sets: number | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
}
