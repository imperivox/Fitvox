import { supabase } from "../lib/supabase";
import type { Exercise, Workout, WorkoutExercise, ExerciseGoal } from "../types/database";

export const exerciseService = {
  async getExercises() {
    const { data, error } = await supabase.from("exercises").select("*").order("name");

    if (error) throw error;
    return data as Exercise[];
  },

  async createExercise(exercise: Partial<Exercise>) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("exercises")
      .insert([{ ...exercise, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data as Exercise;
  },
};

export const workoutService = {
  async getWorkouts() {
    const { data, error } = await supabase
      .from("workouts")
      .select(
        `
        *,
        workout_exercises (
          *,
          exercise: exercises (*)
        )
      `
      )
      .order("start_time", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createWorkout(workout: Partial<Workout>) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("workouts")
      .insert([{ ...workout, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data as Workout;
  },

  async addExerciseToWorkout(workoutExercise: Partial<WorkoutExercise>) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("workout_exercises")
      .insert([{ ...workoutExercise, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data as WorkoutExercise;
  },
};

export const goalService = {
  async getGoals() {
    const { data, error } = await supabase
      .from("exercise_goals")
      .select(
        `
        *,
        exercise: exercises (*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createGoal(goal: Partial<ExerciseGoal>) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("exercise_goals")
      .insert([{ ...goal, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data as ExerciseGoal;
  },
};
