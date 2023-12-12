import React, { useMemo } from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import Application from "./navigators";
import {
  PaperProvider,
  configureFonts
} from "react-native-paper";
import { DarkTheme, LightTheme } from "./utils/themes";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import { persistor, store } from "./store";
import AddButton from "@/components/buttons/AddButton"

function App(): JSX.Element {
  let colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? DarkTheme : LightTheme;
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaView
        style={{ backgroundColor: paperTheme.colors.background, flex: 1 }}
      >
        <StatusBar
          barStyle={paperTheme.dark ? "light-content" : "dark-content"}
          backgroundColor={paperTheme.colors.background}
        />
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <Application />
 
          </Provider>
        </PersistGate>
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
