import { View, Text } from 'react-native';
import React from 'react';
import { HomeContainerProps } from '../../models/NavigatorModels/MainStackProps';

export default function HomeContainer({
  navigation,
  route,
}: HomeContainerProps) {
  return (
    <View>
      <Text>HomeContainer</Text>
    </View>
  );
}
