import type { Exercise } from "../types/database";
import type { ExerciseData } from "../types/exerciseDb";

export const mapExerciseFromApi = (exercise: ExerciseData): Exercise => ({
  id: exercise.exerciseId,
  name: exercise.name,
  description: exercise.instructions.join("\n"),
  category: exercise.bodyParts[0],
  is_custom: false,
  is_public: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user_id: null,
  equipment: exercise.equipments[0],
  target_muscle: exercise.targetMuscles[0],
  gif_url: exercise.gifUrl,
});
