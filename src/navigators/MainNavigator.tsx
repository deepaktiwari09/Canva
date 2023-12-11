import { View, Text } from 'react-native';
import React from 'react';
import { MainContainerProps, MainStack } from '../models/NavigatorModels';
import { HomeContainer } from '../containers';

export default function MainNavigator({
  navigation,
  route,
}: MainContainerProps) {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeContainer} />
    </MainStack.Navigator>
  );
}
