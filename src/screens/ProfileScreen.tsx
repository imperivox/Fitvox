import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import type { MainScreenProps } from "../types/navigation";

export const ProfileScreen = ({ navigation }: MainScreenProps) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
