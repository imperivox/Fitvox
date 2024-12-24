import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import type { Exercise } from "../types/database";

interface ExerciseDetailsProps {
  exercise: Exercise;
}

export const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise }) => {
  return (
    <ScrollView style={styles.container}>
      {exercise.gif_url && <Image source={{ uri: exercise.gif_url }} style={styles.gif} resizeMode="contain" />}
      <Text style={styles.title}>{exercise.name}</Text>
      {exercise.category && <Text style={styles.category}>{exercise.category}</Text>}
      {exercise.target_muscle && <Text style={styles.target}>Target Muscle: {exercise.target_muscle}</Text>}
      {exercise.equipment && <Text style={styles.equipment}>Equipment: {exercise.equipment}</Text>}
      {exercise.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  gif: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 4,
  },
  target: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 4,
  },
  equipment: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },
});
