import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from './../../../node_modules/react-native-screens/src/native-stack/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackProps } from './RootStackProps';
import { AuthStackProps } from './AuthStackProps';

export type MainStackProps = {
  Home: undefined;
};

export type MainUtilityNavigationProps = MainStackProps &
  RootStackProps &
  AuthStackProps;

export type HomeContainerProps = CompositeScreenProps<
  StackScreenProps<MainStackProps, 'Home'>,
  CompositeScreenProps<
    StackScreenProps<RootStackProps>,
    StackScreenProps<AuthStackProps>
  >
>;

const MainStack = createNativeStackNavigator<MainStackProps>();
export default MainStack;
