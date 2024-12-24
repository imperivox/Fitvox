import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native";
import type { Workout } from "../types/database";

interface WorkoutFormProps {
  onSubmit: (workout: Partial<Workout>) => Promise<void>;
  loading: boolean;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSubmit({
      name,
      notes,
      start_time: new Date().toISOString(),
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Workout Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Starting..." : "Start Workout"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  form: {
    padding: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
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
