import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import AdminScreen from "./screens/AdminScreen"; // Nova tela de administração

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Avisos" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detalhes do Aviso" }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ title: "Administração" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
