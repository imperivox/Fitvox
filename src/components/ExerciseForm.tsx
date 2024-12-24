import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native";
import type { Exercise } from "../types/database";

interface ExerciseFormProps {
  onSubmit: (exercise: Partial<Exercise>) => Promise<void>;
  loading: boolean;
}

export const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      category,
      is_custom: true,
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Exercise Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
        <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Saving..." : "Save Exercise"}</Text>
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
