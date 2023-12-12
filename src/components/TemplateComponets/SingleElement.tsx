import { View, Text, Platform, Dimensions, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { ElementTypes } from "@/containers/Main/constents";
import {
  getDimensionValue,
  getElementCenterPositionValue,
} from "@/containers/Main/utility";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

type props = {
  basePercentage: number;
  rectDimensionData: {
    xPos: number;
    yPos: number;
    oHeight: number;
    oWidth: number;
    text?: string;
    uri?: string;
  };
  isCenter: boolean;
  type: keyof ElementTypes;
  meta: {
    uri: string;
    roundness?: undefined;
    backgroundColor?: undefined;
    text?: undefined;
    fontSize?: undefined;
    fontWeight?: undefined;
    fontColor?: undefined;
  };
  layerIndex:number
};

export default function SingleElement({
  basePercentage,
  rectDimensionData,
  isCenter,
  type,
  meta,
  layerIndex
}: props) {
  let rectHeight = getDimensionValue(basePercentage, rectDimensionData.oHeight);
  let rectWidth = getDimensionValue(basePercentage, rectDimensionData.oWidth);
  const [rectDimension,setRectDimension ] = useState(rectDimensionData)

  const position = useMemo(() => {
    if (isCenter) {
      let yPos = getElementCenterPositionValue(width, rectHeight);
      let xPos = getElementCenterPositionValue(width, rectWidth);
      return { xPos, yPos };
    } else {
      let { xPos, yPos, ...rest } = rectDimension;
      return { xPos, yPos };
    }
  }, [isCenter, rectDimension, rectHeight, rectWidth]);

  if (type == "VECTOR") {
    return (
      <GestureHandlerRootView style={{}}>
        <PanGestureHandler
          onGestureEvent={(e) => {
            setRectDimension({...rectDimension,xPos:e.nativeEvent.x,yPos:e.nativeEvent.y}) 
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: layerIndex,
              left: position.xPos,
              top: position.yPos,
              width: rectWidth,
              height: rectHeight,
              borderRadius: meta.roundness ?? 10,
              backgroundColor: meta.backgroundColor ?? "red",
            }}
          />
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  }

  if (type == "IMAGE") {
    return (
      <GestureHandlerRootView style={{}}>
        <PanGestureHandler
          onGestureEvent={(e) => {
            setRectDimension({...rectDimension,xPos:e.nativeEvent.x,yPos:e.nativeEvent.y}) 
          }}
        >
          <Image
            style={{
              position: "absolute",
              zIndex: layerIndex,
              top: position.yPos,
              left: position.xPos,
              height: rectHeight,
              width: rectWidth,
            }}
            source={{ uri: meta.uri }}
            resizeMode="stretch"
          />
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  }

  if (type == "TEXT") {
    const fontFamily = Platform.select({
      ios: "Helvetica",
      default: "serif",
    });
    const fontStyle = {
      fontFamily,
      fontSize: meta.fontSize ?? 22,
      fontStyle: "italic",
      fontWeight: "700",
      color: meta.fontColor ?? "black",
    };

    return (
      <GestureHandlerRootView >
        <PanGestureHandler
          onGestureEvent={(e) => {
            setRectDimension({...rectDimension,xPos:e.nativeEvent.x,yPos:e.nativeEvent.y}) 
          }}
        >
          <Text
            style={{
              ...fontStyle,
              position: "absolute",
              zIndex: layerIndex,
              top: position.yPos,
              left: position.xPos,
              height: rectHeight,
              width: 400,
            }}
          >
            {meta.text}
          </Text>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  }
}
