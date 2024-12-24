import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { workoutService } from "../services/supabase";

export const HistoryScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await workoutService.getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error loading workouts:", error);
    } finally {
      setLoading(false);
    }
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
      <Text style={styles.title}>Workout History</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutName}>{item.name || "Unnamed Workout"}</Text>
            <Text style={styles.workoutDate}>{new Date(item.start_time).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  workoutItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
    color: "#666",
  },
});
