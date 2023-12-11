import { CompositeScreenProps } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackProps } from "./RootStackProps";
import { z } from "zod";

export type AuthStackProps = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type LoginContainerProps = CompositeScreenProps<
  StackScreenProps<AuthStackProps, "Login">,
  StackScreenProps<Omit<RootStackProps, "AuthNavigator">, "MainNavigator">
>;

export type AuthUtilityNavigationProps = AuthStackProps &
  Omit<RootStackProps, "AuthNavigator">;

export type SignupContainerProps = CompositeScreenProps<
  StackScreenProps<AuthStackProps, "Signup">,
  StackScreenProps<Omit<RootStackProps, "AuthNavigator">, "MainNavigator">
>;

export type ForgotPasswordContainerProps = CompositeScreenProps<
  StackScreenProps<AuthStackProps, "ForgotPassword">,
  StackScreenProps<Omit<RootStackProps, "AuthNavigator">, "MainNavigator">
>;

const AuthStack = createNativeStackNavigator<AuthStackProps>();
export default AuthStack;
