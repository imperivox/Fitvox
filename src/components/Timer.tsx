import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface TimerProps {
  defaultTime?: number; // Time in seconds
  onComplete?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ defaultTime = 60, onComplete }) => {
  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((current) => {
          if (current <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return current - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, onComplete]);

  const toggleTimer = () => {
    if (!isActive && time === 0) {
      setTime(defaultTime);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(defaultTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, isActive ? styles.stopButton : styles.startButton]} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? "Pause" : time === 0 ? "Restart" : "Start"}</Text>
        </TouchableOpacity>
        {time !== defaultTime && (
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  time: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#0284c7",
  },
  stopButton: {
    backgroundColor: "#ef4444",
  },
  resetButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
