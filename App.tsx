import React from 'react';
import { AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/app/AppNavigator';


export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}