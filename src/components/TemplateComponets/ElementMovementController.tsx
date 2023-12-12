import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  ElementListAtom,
  activeElementAtom,
  activeElementID,
} from "@/atoms/CanvasElements";

export default function ElementMovementController() {
  const currentElementId = useAtomValue(activeElementID);
  const [ElementList, setElementList] = useAtom(ElementListAtom);
  function onGestureHandler(
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) {
    // console.log(event.nativeEvent.x,event.nativeEvent.y)
    // setRectDimension({x:event.nativeEvent.x,y:event.nativeEvent.y})
    let mapped = ElementList.map((el, eli) => {
      if (eli == currentElementId) {
        return { ...el, xPos: event.nativeEvent.x, yPos: event.nativeEvent.y };
      } else {
        return el;
      }
    });

    setElementList(mapped);
  }

  return (
    <GestureHandlerRootView style={styles.main}>
      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <View
          style={{ flex: 1, backgroundColor: "red", borderRadius: 20 }}
        ></View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 250,
    width: 250,

    backgroundColor: "rgba(200,200,200,1)",
    borderRadius: 20,
    overflow: "hidden",
  },
});
