import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SetTracker } from "./SetTracker";
import { Timer } from "./Timer";
import { ExerciseDetails } from "./ExerciseDetails";
import type { Exercise, WorkoutExercise } from "../types/database";

interface WorkoutExerciseCardProps {
  exercise: Exercise;
  workoutId: string;
  onSaveSet: (set: Partial<WorkoutExercise>) => Promise<void>;
  sets: WorkoutExercise[];
}

export const WorkoutExerciseCard: React.FC<WorkoutExerciseCardProps> = ({ exercise, workoutId, onSaveSet, sets }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setShowDetails(!showDetails)}>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.sets}>{sets.length} sets</Text>
      </TouchableOpacity>

      {showDetails && <ExerciseDetails exercise={exercise} />}

      <View style={styles.setsContainer}>
        {sets.map((set, index) => (
          <View key={set.id} style={styles.setRow}>
            <Text style={styles.setNumber}>Set {index + 1}</Text>
            <Text style={styles.setValue}>{set.reps} reps</Text>
            <Text style={styles.setValue}>{set.weight} kg</Text>
          </View>
        ))}
      </View>

      <SetTracker workoutId={workoutId} exerciseId={exercise.id} onSaveSet={onSaveSet} />

      <TouchableOpacity style={styles.timerButton} onPress={() => setShowTimer(!showTimer)}>
        <Text style={styles.timerButtonText}>{showTimer ? "Hide Timer" : "Show Rest Timer"}</Text>
      </TouchableOpacity>

      {showTimer && <Timer defaultTime={90} onComplete={() => setShowTimer(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  sets: {
    fontSize: 14,
    color: "#6b7280",
  },
  setsContainer: {
    padding: 16,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  setNumber: {
    fontSize: 14,
    fontWeight: "500",
    width: 60,
  },
  setValue: {
    fontSize: 14,
    color: "#374151",
  },
  timerButton: {
    padding: 16,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },
  timerButtonText: {
    color: "#0284c7",
    fontSize: 14,
    fontWeight: "500",
  },
});
