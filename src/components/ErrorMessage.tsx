import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fee2e2",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  text: {
    color: "#dc2626",
    fontSize: 14,
  },
});
