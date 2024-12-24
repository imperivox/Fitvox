import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkoutScreen } from "./WorkoutScreen";
import { HistoryScreen } from "./HistoryScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
