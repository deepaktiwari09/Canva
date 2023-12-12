import {
  View,
  Text,
  Platform,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  ElementListAtom,
  activeElementAtom,
  activeElementID,
  canvasElementModeAtom,
} from "@/atoms/CanvasElements";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { height, width } = Dimensions.get("window");

type props = {
  basePercentage: number;
  rectDimensionData: {
    xPos: number;
    yPos: number;
    oHeight: number;
    oWidth: number;
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
  layerIndex: number;
};

export default function SingleElement({
  basePercentage,
  rectDimensionData,
  isCenter,
  type,
  meta,
  layerIndex,
}: props) {
  let rectHeight = useMemo(
    () => getDimensionValue(basePercentage, rectDimensionData.oHeight),
    [rectDimensionData.oHeight]
  );
  let rectWidth = useMemo(
    () => getDimensionValue(basePercentage, rectDimensionData.oWidth),
    [rectDimensionData.oWidth]
  );
  const [RectDimension, resetReactDimension] = useAtom(activeElementAtom);
  const [activeIndex, setActiveIndex] = useAtom(activeElementID);
  const setElementList = useSetAtom(ElementListAtom);
  const setCanvasMode = useSetAtom(canvasElementModeAtom)

  const position = useMemo(() => {
    if (activeIndex == layerIndex) {
      rectDimensionData.xPos = RectDimension?.x ?? rectDimensionData.xPos;
      rectDimensionData.yPos = RectDimension?.y ?? rectDimensionData.yPos;
      return { ...rectDimensionData };
    }
    if (isCenter) {
      let yPos = getElementCenterPositionValue(width, rectHeight);
      let xPos = getElementCenterPositionValue(width, rectWidth);
      return { xPos, yPos };
    } else {
      let { xPos, yPos, ...rest } = rectDimensionData;
      return { xPos, yPos };
    }
  }, [isCenter, rectDimensionData, rectHeight, rectWidth, RectDimension]);

  const selectElement = () => {
    resetReactDimension(null);
    setActiveIndex(layerIndex);
  };

  const removeElement = () => {
    resetReactDimension(null);
    setActiveIndex(-1);
    setCanvasMode({mode:'View',elementType:null})
    setElementList((prev) => prev.filter((prv, prvi) => prvi != layerIndex));
  };

  const editElement = () => {
    setCanvasMode({mode:'Edit',elementType:type})
  };

  if (type == "VECTOR") {
    return (
      <Pressable
        style={{
          position: "absolute",
          zIndex: layerIndex,
          left: position.xPos,
          top: position.yPos,
          width: rectWidth,
          height: rectHeight,
          borderRadius: meta.roundness ?? 10,
          backgroundColor: meta.backgroundColor ?? "red",
          borderColor: activeIndex == layerIndex ? "black" : "white",
          borderWidth: 1,
        }}
        onPress={selectElement}
      >
        <DeleteElementButton
          isVisible={activeIndex == layerIndex}
          onRemovePressed={removeElement}
          zIndex={layerIndex + 1}
        />
        <EditElementButton
          isVisible={activeIndex == layerIndex}
          onEditPressed={editElement}
          zIndex={layerIndex + 1}
        />
      </Pressable>
    );
  }

  if (type == "IMAGE") {
    return (
      <Pressable
        onPress={selectElement}
        style={{
          borderColor: activeIndex == layerIndex ? "black" : "white",
          borderWidth: 1,
          position: "absolute",
          zIndex: layerIndex,
          top: position.yPos,
          left: position.xPos,
          height: rectHeight,
          width: rectWidth,
        }}
      >
        <DeleteElementButton
          isVisible={activeIndex == layerIndex}
          onRemovePressed={removeElement}
          zIndex={layerIndex + 1}
        />
        <EditElementButton
          isVisible={activeIndex == layerIndex}
          onEditPressed={editElement}
          zIndex={layerIndex + 1}
        />
        <Image
          style={{
            height: rectHeight,
            width: rectWidth,
          }}
          source={{ uri: meta.uri }}
          resizeMode="stretch"
        />
      </Pressable>
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
      <Pressable
        onPress={selectElement}
        style={{
          position: "absolute",
          zIndex: layerIndex,
          top: position.yPos,
          left: position.xPos,
          // height: rectHeight,
          // width: 400,
          backgroundColor:
            activeIndex == layerIndex ? "rgba(10,10,10,.5)" : "transparent",
          borderColor: activeIndex == layerIndex ? "black" : "white",
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            ...fontStyle,
          }}
        >
          {meta.text}
        </Text>
        <DeleteElementButton
          isVisible={activeIndex == layerIndex}
          onRemovePressed={removeElement}
          zIndex={layerIndex + 1}
        />
        <EditElementButton
          isVisible={activeIndex == layerIndex}
          onEditPressed={editElement}
          zIndex={layerIndex + 1}
        />
      </Pressable>
    );
  }
}

type DeleteElementButtonProps = {
  isVisible: boolean;
  onRemovePressed: () => void;
  zIndex: number;
};

function DeleteElementButton({
  isVisible,
  onRemovePressed,
  zIndex,
}: DeleteElementButtonProps) {
  if (!isVisible) {
    return <></>;
  }

  return (
    <Pressable
      onPress={onRemovePressed}
      style={{
        position: "absolute",
        zIndex: zIndex,
        top: -10,
        right: -10,
        backgroundColor: "white",
        borderRadius: 50,
      }}
    >
      <AntDesign name="closecircle" size={24} color={"red"} />
    </Pressable>
  );
}

type EditElementButtonProps = {
  isVisible: boolean;
  onEditPressed: () => void;
  zIndex: number;
};

function EditElementButton({
  isVisible,
  onEditPressed,
  zIndex,
}: EditElementButtonProps) {
  if (!isVisible) {
    return <></>;
  }

  return (
    <Pressable
      onPress={onEditPressed}
      style={{
        position: "absolute",
        zIndex: zIndex,
        bottom: -10,
        right: -10,
        backgroundColor: "white",
        borderRadius: 50,
      }}
    >
      <MaterialCommunityIcons name="pencil-circle" size={24} color={"green"} />
    </Pressable>
  );
}
