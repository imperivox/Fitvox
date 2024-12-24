import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import type { Exercise } from "../types/database";

interface ExerciseListProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onSelectExercise }) => {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelectExercise(item)}>
          <View style={styles.content}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              {item.category && <Text style={styles.category}>{item.category}</Text>}
              {item.target_muscle && <Text style={styles.target}>Target: {item.target_muscle}</Text>}
              {item.equipment && <Text style={styles.equipment}>Equipment: {item.equipment}</Text>}
            </View>
            {item.gif_url && <Image source={{ uri: item.gif_url }} style={styles.gif} resizeMode="cover" />}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  target: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  equipment: {
    fontSize: 14,
    color: "#6b7280",
  },
  gif: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
