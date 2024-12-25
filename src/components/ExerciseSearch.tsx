import React, { useState } from "react";
import { StyleSheet, View, TextInput, ActivityIndicator } from "react-native";
import { ExerciseList } from "./ExerciseList";
import { exerciseDbService } from "../services/exerciseDb";
import type { Exercise } from "../types/database";

interface ExerciseSearchProps {
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseSearch: React.FC<ExerciseSearchProps> = ({ onSelectExercise }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setExercises([]);
      return;
    }

    try {
      setLoading(true);
      const results = await exerciseDbService.searchExercises(query);
      setExercises(results);
    } catch (error) {
      console.error("Error searching exercises:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search exercises..." value={searchQuery} onChangeText={handleSearch} autoCapitalize="none" autoCorrect={false} />
        {loading && <ActivityIndicator style={styles.loader} color="#0284c7" />}
      </View>
      <ExerciseList exercises={exercises} onSelectExercise={onSelectExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loader: {
    marginLeft: 16,
  },
});
