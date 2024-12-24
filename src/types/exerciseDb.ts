export interface ExerciseData {
  exerciseId: string;
  name: string;
  gifUrl: string;
  instructions: string[];
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
}

export interface ExerciseDBResponse {
  success: boolean;
  data: ExerciseData;
}
