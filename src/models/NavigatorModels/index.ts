import type {
  RootStackProps,
  SplashContainerProps,
  AuthContainerProps,
  MainContainerProps,
} from './RootStackProps';

import type {
  AuthStackProps,
  LoginContainerProps,
  SignupContainerProps,
  ForgotPasswordContainerProps,
} from './AuthStackProps';

import type { MainStackProps, HomeContainerProps } from './MainStackProps';

export type {
  RootStackProps,
  SplashContainerProps,
  AuthContainerProps,
  MainContainerProps,
  AuthStackProps,
  LoginContainerProps,
  SignupContainerProps,
  ForgotPasswordContainerProps,
  MainStackProps,
  HomeContainerProps,
};

export { default as MainStack } from './MainStackProps';
export { default as AuthStack } from './AuthStackProps';
export { default as RootStack } from './RootStackProps';
