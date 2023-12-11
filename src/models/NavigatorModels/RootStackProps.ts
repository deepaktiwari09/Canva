import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "./../../../node_modules/react-native-screens/src/native-stack/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { MainStackProps } from "./MainStackProps";
import { AuthStackProps } from "./AuthStackProps";

export type RootStackProps = {
  Splash: undefined;
  NoInternet: undefined;
  Permissions: undefined;
  AuthNavigator: undefined | NavigatorScreenParams<AuthStackProps>;
  MainNavigator: undefined | NavigatorScreenParams<MainStackProps>;
};

export type RootUtilityNavigationProps = RootStackProps;

export type NoInternetContainerProps = NativeStackScreenProps<
  RootStackProps,
  "NoInternet"
>;

export type PermissionContainerProps = NativeStackScreenProps<
  RootStackProps,
  "Permissions"
>;

export type SplashContainerProps = NativeStackScreenProps<
  RootStackProps,
  "Splash"
>;
export type AuthContainerProps = NativeStackScreenProps<
  RootStackProps,
  "AuthNavigator"
>;
export type MainContainerProps = NativeStackScreenProps<
  RootStackProps,
  "MainNavigator"
>;

const RootStack = createNativeStackNavigator<RootStackProps>();
export default RootStack;
