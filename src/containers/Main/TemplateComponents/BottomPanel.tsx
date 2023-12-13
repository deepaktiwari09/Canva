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
            makeAndShareImage("Share via","New Messsage");
          }}
        />

      </View>
    </View>
  ) : (
    <ElementEditView />
  );

  async function makeAndShareImage(title: string, message: string) {
    try {
      let uri = await CanvasRef.current?.capture();
      if(uri){
        await Share.open({title,message,uri});
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}

const styles = StyleSheet.create({
  main: {
    height: height - width,
    backgroundColor: "green",
    justifyContent: "space-between",
  },
  container:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: width,
    backgroundColor: "yellow",
    flexDirection:'row'
  }
});
