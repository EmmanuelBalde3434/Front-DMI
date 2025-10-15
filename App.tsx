import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/app/AppNavigator";
import { AuthProvider } from "./src/auth/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
                <StatusBar style="auto" />
            </NavigationContainer>
        </AuthProvider>
    );
}
