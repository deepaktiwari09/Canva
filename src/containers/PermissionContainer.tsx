import { View, Text } from 'react-native'
import React from 'react'
import { PermissionContainerProps } from '../models/NavigatorModels/RootStackProps'

export default function PermissionContainer({
    navigation,
    route
}:PermissionContainerProps) {
  return (
    <View>
      <Text>PermissionContainer</Text>
    </View>
  )
}