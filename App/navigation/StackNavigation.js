import { View, Text } from "react-native";
import React from "react";

import Intro from "../screens/Intro";
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ title: "Bienvenue" }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Accueil" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
