import { View, Text } from 'react-native';
import React from 'react';
import {
  ForgotPasswordContainer,
  LoginContainer,
  SignupContainer,
} from '../containers';
import { AuthContainerProps, AuthStack } from '../models/NavigatorModels';

export default function AuthNavigator({
  navigation,
  route,
}: AuthContainerProps) {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginContainer} />
      <AuthStack.Screen name="Signup" component={SignupContainer} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordContainer}
      />
    </AuthStack.Navigator>
  );
}
