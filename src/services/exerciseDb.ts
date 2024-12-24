import type { Exercise } from "../types/database";
import type { ExerciseDBResponse } from "../types/exerciseDb";
import { mapExerciseFromApi } from "../utils/exerciseMapper";

const API_URL = "https://exercisedb-api.vercel.app/api/v1";

export const exerciseDbService = {
  async getExercises(): Promise<Exercise[]> {
    const response = await fetch(`${API_URL}/exercises?offset=10&limit=10`);
    const result: ExerciseDBResponse = await response.json();
    return result.data.exercises.map(mapExerciseFromApi);
  },

  async searchExercises(query: string): Promise<Exercise[]> {
    const response = await fetch(`${API_URL}/exercises?search=${encodeURIComponent(query)}`);
    const result: ExerciseDBResponse = await response.json();
    return result.data.exercises.map(mapExerciseFromApi);
  },
};
