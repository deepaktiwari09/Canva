import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { sampleTemples as ST } from "../sampleTemplet";
import {
  getBaseCanvasPercentage,
  getDimensionValue,
  getElementCenterPositionValue,
} from "../utility";

import dayjs from "dayjs";
import Share, { Social } from "react-native-share";
import SingleElement from "@/containers/Main/TemplateComponents/SingleElement";
import ViewShot from "react-native-view-shot";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  CanvasBackgroundAtom,
  ElementListAtom,
  activeElementID,
  canvasDimensionsAtom,
  canvasElementModeAtom,
} from "@/atoms/CanvasElements";

import { MutableRefObject, useMemo, useRef, useState } from "react";
const { width, height } = Dimensions.get("window");

type props = {
  CanvasRef: React.RefObject<ViewShot>;
};

export default function CanvasEditorPanel({ CanvasRef }: props) {
  const ElementList = useAtomValue(ElementListAtom);
  const CanvasBackground = useAtomValue(CanvasBackgroundAtom);
  const setCanvasDimensions = useSetAtom(canvasDimensionsAtom);

  const canvas_dimension = useMemo(() => {
    let CD_BASE_WIDTH = getBaseCanvasPercentage(
      width,
      ST.canvasDimensions.width
    );
    let CD_BASE_HEIGHT = getBaseCanvasPercentage(
      height / 2,
      ST.canvasDimensions.height
    );
    let CD_WIDTH = getDimensionValue(CD_BASE_WIDTH, ST.canvasDimensions.width);
    let CD_HEIGHT = getDimensionValue(
      CD_BASE_HEIGHT,
      ST.canvasDimensions.height
    );
    let result = {
      height: CD_HEIGHT,
      width: CD_WIDTH,
      baseWP: CD_BASE_WIDTH,
      baseHP: CD_BASE_HEIGHT,
    };
    setCanvasDimensions(result);
    return result;
  }, [width, height]);

  return (
    <ViewShot
      ref={CanvasRef}
      style={styles.main}
      options={{
        fileName: `Canva_${dayjs().format("YYYYMMDD_hh_mm_ss")}`,
        format: "png",
        quality: 1,
      }}
    >
      {CanvasBackground.background.uri.length != 0 ? (
        <ImageBackground
          source={{ uri: CanvasBackground.background.uri }}
          style={{
            width: canvas_dimension.width,
            height: canvas_dimension.width,
            backgroundColor: CanvasBackground.background.color,
          }}
        >
          {ElementList.map((ce, index) => {
            return (
              <SingleElement
                key={index}
                canvasDimension={canvas_dimension}
                RectDimension={{
                  xPos: ce.xPos,
                  yPos: ce.yPos,
                  oWidth: ce.width,
                  oHeight: ce.height,
                }}
                meta={ce.meta}
                isCenter={false}
                type={ce.type}
                layerIndex={index}
              />
            );
          })}
        </ImageBackground>
      ) : (
        <View
          style={{
            width: canvas_dimension.width,
            height: canvas_dimension.width,
            backgroundColor: CanvasBackground.background.color,
          }}
        >
          {ElementList.map((ce, index) => {
            return (
              <SingleElement
                key={index}
                canvasDimension={canvas_dimension}
                RectDimension={{
                  xPos: ce.xPos,
                  yPos: ce.yPos,
                  oWidth: ce.width,
                  oHeight: ce.height,
                }}
                meta={ce.meta}
                isCenter={false}
                type={ce.type}
                layerIndex={index}
              />
            );
          })}
        </View>
      )}
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(243,243,243,1)",
  },
});
