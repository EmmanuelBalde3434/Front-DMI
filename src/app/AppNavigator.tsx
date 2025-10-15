import React from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../auth/AuthContext";
import MainTabs from "./MainTabs";
import AuthStack from "./AuthStack";
import { ApptProvider } from "../appointments/ApptStore";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
    const { user, pendingOtpUserId, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {!user && !pendingOtpUserId && (
                <RootStack.Screen name="Auth" component={AuthStack} />
            )}

            {!user && pendingOtpUserId && (
                <RootStack.Screen
                    name="OtpVerification"
                    component={OtpVerificationScreen}
                />
            )}

            {user && (
                <RootStack.Screen
                    name="MainTabs"
                    options={{ headerShown: false }}
                >
                    {() => (
                        <ApptProvider>
                            <MainTabs />
                        </ApptProvider>
                    )}
                </RootStack.Screen>
            )}
        </RootStack.Navigator>
    );
}
