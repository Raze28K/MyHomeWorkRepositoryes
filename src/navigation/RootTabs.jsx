import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import FavouritesScreen from "../screens/FavoritesScreen";
import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 100,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "HomeTab") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }

          return (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Главная" }}
      />

      <Tab.Screen
        name="FavouritesTab"
        component={FavouritesScreen}
        options={{ title: "Избранное" }}
      />
    </Tab.Navigator>
  );
}
