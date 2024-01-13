import {
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useMemo } from "react";
import { useAtom } from "jotai";
import { canvasElementModeAtom } from "@/atoms/CanvasElements";
import NewElementMenu from "./NewElementMenu";
import ElementMovementController from "./ElementMovementController";
import ViewShot from "react-native-view-shot";
import Share, { Social } from "react-native-share";
import ElementEditView from "./ElementEditView";
import { fontPixel, heightPixel } from "@/utils/responsive";

const { height, width } = Dimensions.get("window");

type props = {
  CanvasRef: React.RefObject<ViewShot>;
};

export default function BottomPanel({ CanvasRef }: props) {
  const [canvasMode, setCanvasMode] = useAtom(canvasElementModeAtom);

  return canvasMode.mode == "View" ? (
    <View style={styles.main}>
      <View style={styles.container}>
        <ElementMovementController />
        <NewElementMenu
          onSharePostPressed={() => {
            makeAndShareImage("Share via", "New Messsage");
          }}
        />
      </View>
      <View
        style={{
          height: heightPixel(100),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            makeAndShareImage("I created this image", "New Image");
          }}
          style={{
            backgroundColor: "green",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: fontPixel(20) }}>Share</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <ElementEditView />
  );

  async function makeAndShareImage(title: string, message: string) {
    try {
      let url = await CanvasRef.current?.capture();

      if (url) {
        await Share.open({ title, message, url });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const styles = StyleSheet.create({
  main: {
    height: width,
    // backgroundColor: "green",
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    // width: width -40,
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
