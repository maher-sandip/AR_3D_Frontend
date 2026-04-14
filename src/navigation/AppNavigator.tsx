import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import ScannerScreen from "../screens/ScannerScreen";
import ViewerScreen from "../screens/ViewerScreen";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Scanner: undefined;
  Viewer: { glbUrl: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Viewer" component={ViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;