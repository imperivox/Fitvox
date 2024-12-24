import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import type { WorkoutExercise } from "../types/database";

interface SetTrackerProps {
  workoutId: string;
  exerciseId: string;
  onSaveSet: (set: Partial<WorkoutExercise>) => Promise<void>;
}

export const SetTracker: React.FC<SetTrackerProps> = ({ workoutId, exerciseId, onSaveSet }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveSet = async () => {
    try {
      setLoading(true);
      await onSaveSet({
        workout_id: workoutId,
        exercise_id: exerciseId,
        reps: parseInt(reps, 10),
        weight: parseFloat(weight),
        set_number: 1, // This will be calculated on the server
      });
      // Clear inputs after successful save
      setReps("");
      setWeight("");
    } catch (error) {
      console.error("Error saving set:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Reps</Text>
          <TextInput style={styles.input} value={reps} onChangeText={setReps} keyboardType="numeric" placeholder="0" />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="0.0" />
        </View>
      </View>
      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSaveSet} disabled={loading || !reps || !weight}>
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Add Set"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0284c7",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
