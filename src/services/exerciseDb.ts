import type { Exercise } from "../types/database";

const API_URL = "https://exercisedb-api.vercel.app/api";

export interface ExerciseDBResponse {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  instructions: string[];
}

export const exerciseDbService = {
  async getExercises(): Promise<Exercise[]> {
    const response = await fetch(`${API_URL}/exercises`);
    const data: ExerciseDBResponse[] = await response.json();

    return data.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      description: exercise.instructions.join("\n"),
      category: exercise.bodyPart,
      is_custom: false,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: null,
      equipment: exercise.equipment,
      target_muscle: exercise.target,
      gif_url: exercise.gifUrl,
    }));
  },

  async searchExercises(query: string): Promise<Exercise[]> {
    const response = await fetch(`${API_URL}/exercises/name/${query}`);
    const data: ExerciseDBResponse[] = await response.json();

    return data.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      description: exercise.instructions.join("\n"),
      category: exercise.bodyPart,
      is_custom: false,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: null,
      equipment: exercise.equipment,
      target_muscle: exercise.target,
      gif_url: exercise.gifUrl,
    }));
  },
};
