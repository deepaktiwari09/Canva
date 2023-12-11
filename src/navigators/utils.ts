import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackProps } from '../models/NavigatorModels';

export const navigationRef = createNavigationContainerRef<RootStackProps>();

export const navigate = <T>(name: keyof T, params?: T[keyof T]) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
};

export const navigateAndSimpleReset = <T>(
  name: keyof T,
  params?: T[keyof T],
  index = 0,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name, params }],
      }),
    );
  }
};
