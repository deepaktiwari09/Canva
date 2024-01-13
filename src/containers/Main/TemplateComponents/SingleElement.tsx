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
import { fontPixel, heightPixel, widthPixel } from "@/utils/responsive";

const { height, width } = Dimensions.get("window");

type props = {
  canvasDimension: {
    height: number;
    width: number;
    baseWP: number;
    baseHP: number;
  };
  RectDimension: {
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
  canvasDimension,
  RectDimension,
  isCenter,
  type,
  meta,
  layerIndex,
}: props) {
  let rectHeight = useMemo(
    () => getDimensionValue(canvasDimension.baseHP, RectDimension.oHeight),
    [RectDimension.oHeight]
  );
  let rectWidth = useMemo(
    () => getDimensionValue(canvasDimension.baseWP, RectDimension.oWidth),
    [RectDimension.oWidth]
  );
  // const [RectDimension, resetReactDimension] = useAtom(activeElementAtom);
  const [activeIndex, setActiveIndex] = useAtom(activeElementID);
  const setElementList = useSetAtom(ElementListAtom);
  const setCanvasMode = useSetAtom(canvasElementModeAtom);

  const position = useMemo(() => {
    if (isCenter) {
      let yPos =getElementCenterPositionValue(width, rectHeight)
      let xPos = getElementCenterPositionValue(width, rectWidth)
      return { xPos, yPos };
    } else {
      let { xPos, yPos, ...rest } = RectDimension;
      return { xPos, yPos };
    }
  }, [isCenter, RectDimension, rectHeight, rectWidth]);

  const selectElement = () => {
    setActiveIndex(layerIndex);
  };

  const removeElement = () => {
    setActiveIndex(-1);
    setCanvasMode({ mode: "View", elementType: null });
    setElementList((prev) => prev.filter((prv, prvi) => prvi != layerIndex));
  };

  const editElement = () => {
    setCanvasMode({ mode: "Edit", elementType: type });
  };

  if (type == "VECTOR") {
    return (
      <Pressable
        style={{
          position: "absolute",
          zIndex: layerIndex,
          left: widthPixel(position.xPos),
          top: heightPixel(position.yPos),
          width: widthPixel(rectWidth),
          height: heightPixel(rectHeight),
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
          borderWidth: activeIndex == layerIndex ? 1 : 0,
          position: "absolute",
          zIndex: layerIndex,
          top: heightPixel(position.yPos),
          left: widthPixel(position.xPos),
          height: heightPixel(rectHeight),
          width: widthPixel(rectWidth),
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
          source={meta.uri.length > 0 ? { uri: meta.uri } : meta.localUri}
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
      fontSize: fontPixel(meta.fontSize ?? 22),
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
          top: heightPixel(position.yPos),
          left: widthPixel(position.xPos),
          // height: rectHeight,
          // width: 400,
          backgroundColor:
            activeIndex == layerIndex ? "rgba(100,100,100,.1)" : "transparent",
          borderColor: activeIndex == layerIndex ? "black" : "transparent",
          paddingHorizontal: activeIndex == layerIndex ? 10 : 0,
          paddingVertical: activeIndex == layerIndex ? 5 : 0,
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

  if (type == "EMOJI") {
    const fontStyle = {
      fontSize: fontPixel(meta.fontSize ?? 22),
    };

    return (
      <Pressable
        onPress={selectElement}
        style={{
          position: "absolute",
          zIndex: layerIndex,
          top: heightPixel(position.yPos),
          left: widthPixel(position.xPos),
          // height: rectHeight,
          // width: 400,
          backgroundColor: "transparent",
          borderColor: activeIndex == layerIndex ? "black" : "transparent",
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
