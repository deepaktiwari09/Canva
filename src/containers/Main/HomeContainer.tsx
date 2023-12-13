import { View, StyleSheet, Pressable, Text } from "react-native";
import React, { useRef } from "react";
import { HomeContainerProps } from "../../models/NavigatorModels/MainStackProps";

import ViewShot from "react-native-view-shot";
import BottomPanel from "./TemplateComponents/BottomPanel";
import CanvasEditorPanel from "./TemplateComponents/CanvasEditorPanel";

export default function HomeContainer({
  navigation,
  route,
}: HomeContainerProps) {
  const canvasRef = useRef<ViewShot>(null);

  return (
    <View style={styles.main}>
      <CanvasEditorPanel CanvasRef={canvasRef} />
      <BottomPanel CanvasRef={canvasRef} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(243,243,243,1)",
    flex: 1,
  },
});
