import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Modal } from "react-native";
import { WorkoutForm } from "../components/WorkoutForm";
import { WorkoutExerciseCard } from "../components/WorkoutExerciseCard";
import { ExerciseList } from "../components/ExerciseList";
import { exerciseDbService } from "../services/exerciseDb";
import { workoutService } from "../services/supabase";
import type { Exercise, Workout, WorkoutExercise } from "../types/database";

export const WorkoutScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutExercises, setWorkoutExercises] = useState<{
    [key: string]: WorkoutExercise[];
  }>({});
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const data = await exerciseDbService.getExercises();
      setExercises(data);
    } catch (error) {
      console.error("Error loading exercises:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWorkout = async (workout: Partial<Workout>) => {
    try {
      setLoading(true);
      const newWorkout = await workoutService.createWorkout(workout);
      setCurrentWorkout(newWorkout);
    } catch (error) {
      console.error("Error starting workout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSet = async (set: Partial<WorkoutExercise>) => {
    if (!currentWorkout) return;

    try {
      const newSet = await workoutService.addExerciseToWorkout({
        ...set,
        workout_id: currentWorkout.id,
      });

      setWorkoutExercises((prev) => ({
        ...prev,
        [set.exercise_id!]: [...(prev[set.exercise_id!] || []), newSet],
      }));
    } catch (error) {
      console.error("Error adding set:", error);
    }
  };

  const handleSelectExercise = (exercise: Exercise) => {
    if (!workoutExercises[exercise.id]) {
      setWorkoutExercises((prev) => ({
        ...prev,
        [exercise.id]: [],
      }));
    }
    setShowExerciseModal(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentWorkout ? (
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Current Workout</Text>
            <Text style={styles.subtitle}>{new Date(currentWorkout.start_time).toLocaleTimeString()}</Text>
          </View>

          {Object.keys(workoutExercises).map((exerciseId) => {
            const exercise = exercises.find((e) => e.id === exerciseId);
            if (!exercise) return null;

            return <WorkoutExerciseCard key={exerciseId} exercise={exercise} workoutId={currentWorkout.id} onSaveSet={handleAddSet} sets={workoutExercises[exerciseId]} />;
          })}

          <TouchableOpacity style={styles.addButton} onPress={() => setShowExerciseModal(true)}>
            <Text style={styles.addButtonText}>Add Exercise</Text>
          </TouchableOpacity>

          <Modal visible={showExerciseModal} animationType="slide" onRequestClose={() => setShowExerciseModal(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Exercise</Text>
                <TouchableOpacity onPress={() => setShowExerciseModal(false)}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
              <ExerciseList exercises={exercises} onSelectExercise={handleSelectExercise} />
            </View>
          </Modal>
        </ScrollView>
      ) : (
        <WorkoutForm onSubmit={handleStartWorkout} loading={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  addButton: {
    margin: 20,
    padding: 16,
    backgroundColor: "#0284c7",
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    color: "#0284c7",
    fontSize: 16,
  },
});
