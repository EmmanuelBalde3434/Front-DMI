import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import MainTabs from './MainTabs';
import AuthStack from './AuthStack';
import { ApptProvider } from '../appointments/ApptStore';


export default function AppNavigator() {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }
    if (!user) return <AuthStack />;
    return (
        <ApptProvider>
            <MainTabs />
        </ApptProvider>
    );
}