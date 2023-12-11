import { View, Text } from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { linking } from '../utils/deepplinks';
import { useFlipper } from '@react-navigation/devtools';
import { SplashContainer } from '../containers';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootStack } from '../models/NavigatorModels';
import { navigationRef } from './utils';
import NoInternetContainer from '../containers/NoInternetContainer';
import PermissionContainer from '../containers/PermissionContainer';

export default function Application() {
  useFlipper(navigationRef);
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Splash" component={SplashContainer} />
        <RootStack.Screen name='NoInternet' component={NoInternetContainer}/>
        <RootStack.Screen name='Permissions' component={PermissionContainer}/>
        <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
        <RootStack.Screen name="MainNavigator" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
