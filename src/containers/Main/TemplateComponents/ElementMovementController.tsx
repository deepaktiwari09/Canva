import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  ElementListAtom,
  activeElementAtom,
  activeElementID,
  canvasDimensionsAtom,
} from "@/atoms/CanvasElements";

const { width, height } = Dimensions.get("window");

import {
  Shadow,
  Fill,
  RoundedRect,
  Canvas
} from "@shopify/react-native-skia";
 
const Neumorphism = () => {
  return (
    <Canvas style={{ width: 256, height: 256 }}>
      <Fill color="rgba(243,243,243,1)" />
      <RoundedRect x={32} y={32} width={192} height={192} r={32} color="white">
        <Shadow dx={12} dy={12} blur={25} color="lightblue" />
        <Shadow dx={-12} dy={-12} blur={25} color="lightblue" />
      </RoundedRect>
    </Canvas>
  );
};

export default function ElementMovementController() {
  const currentElementId = useAtomValue(activeElementID);
  const [ElementList, setElementList] = useAtom(ElementListAtom);
  const canvasDimension = useAtomValue(canvasDimensionsAtom);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      let mapped = ElementList.map((el, eli) => {
        if (eli == currentElementId) {
          return { ...el, xPos: event.x, yPos: event.y };
        } else {
          return el;
        }
      });
      setElementList(mapped);
    })
    .onEnd((event) => {
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      let mapped = ElementList.map((el, eli) => {
        if (eli == currentElementId) {
          if (el.type == "VECTOR" || el.type == "IMAGE") {
            let w = el.width * event.scale;
            let h = el.height * event.scale;
            let rv = el.meta?.roundness * event.scale;

            let wValue =
              w <= canvasDimension?.width
                ? w > 25
                  ? w
                  : el.width
                : canvasDimension?.width;
            let hValue =
              h <= canvasDimension?.height
                ? h > 25
                  ? h
                  : el.height
                : canvasDimension?.height;
            // let roundValue = rv <= 80 ? rv>12 ? rv:12:80

            return {
              ...el,
              width: wValue,
              height: hValue,
              meta: { ...el.meta, roundness: rv },
            };
          } else if (el.type == "TEXT" || el.type == "EMOJI") {
            let fs = el.meta?.fontSize * event.scale;

            let fsValue = fs <= 80 ? (fs > 12 ? fs : 12) : 80;

            return { ...el, meta: { ...el.meta, fontSize: fsValue } };
          }
        } else {
          return el;
        }
      });
      setElementList(mapped);
    })
    .onEnd((event) => {
    });

  return (
    <GestureHandlerRootView style={styles.main}>
      <GestureDetector gesture={Gesture.Race(panGesture, pinchGesture)}>
          <Neumorphism/>
        
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {},
  container: {
    height: 250,
    width: 250,
    backgroundColor: "rgba(200,200,200,1)",
    borderRadius: 20,
  },
});
