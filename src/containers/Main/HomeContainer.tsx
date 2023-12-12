import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
  Text as NativeText,
  Image as NativeImage,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { HomeContainerProps } from "../../models/NavigatorModels/MainStackProps";
import {
  Canvas,
  Circle,
  Group,
  Paragraph,
  Rect,
  Skia,
  Text,
  listFontFamilies,
  matchFont,
  Image,
  useImage,
  RoundedRect,
  CanvasProps,
  useCanvasRef,
} from "@shopify/react-native-skia";
import { sampleTemples as ST } from "./sampleTemplet";
import {
  getBaseCanvasPercentage,
  getDimensionValue,
  getElementCenterPositionValue,
} from "./utility";
import { ElementTypes } from "./constents";
import RNFS from "react-native-fs";
import dayjs from "dayjs";
import Share, { Social } from "react-native-share";

export default function HomeContainer({
  navigation,
  route,
}: HomeContainerProps) {
  const { width, height } = useWindowDimensions();
  const canvasRef = useCanvasRef();

  const canvas_dimension = useMemo(() => {
    let CD_BASE = getBaseCanvasPercentage(width, ST.canvasDimensions.width);
    let CD_WIDTH = getDimensionValue(CD_BASE, ST.canvasDimensions.width);
    let CD_HEIGHT = getDimensionValue(CD_BASE, ST.canvasDimensions.height);
    return {
      height: CD_HEIGHT,
      width: CD_WIDTH,
      baseP: CD_BASE,
    };
  }, [width, height]);

  type props = {
    basePercentage: number;
    rectDimension: {
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
  };

  function Element({
    basePercentage,
    rectDimension,
    isCenter,
    type,
    meta,
  }: props) {
    let rectHeight = getDimensionValue(basePercentage, rectDimension.oHeight);
    let rectWidth = getDimensionValue(basePercentage, rectDimension.oWidth);

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
        <RoundedRect
          x={position.xPos}
          y={position.yPos}
          width={rectWidth}
          height={rectHeight}
          color={meta.backgroundColor ?? "red"}
          r={meta.roundness ?? 10}
        />
      );
    }

    if (type == "IMAGE") {
      const image2 = useImage(meta.uri ?? "");
      return (
        <Image
          image={image2}
          fit="fill"
          x={position.xPos}
          y={position.yPos}
          width={rectWidth}
          height={rectHeight}
        />
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
        fontWeight: "bold",
        color: Skia.Color(meta.fontColor ?? "black"),
      };

      let value = Skia.ParagraphBuilder.Make({})
        .pushStyle({ ...fontStyle, fontStyle: { weight: 700 } })
        .addText(meta.text ?? "")
        .pop()
        .build();
      return (
        <Paragraph
          x={position.xPos}
          y={position.yPos}
          paragraph={value}
          width={400}
        />
      );
    }
  }

  const [ogImage, setOgImage] = useState<string | null>(null);

  async function makeAndShareImage() {
    let data = canvasRef.current?.makeImageSnapshot();
    let originalImage = data?.encodeToBase64();

    if (originalImage) {
      let fileName = `${RNFS.DocumentDirectoryPath}/Canva_${dayjs().format(
        "YYYYMMDD_hh_mm_ss"
      )}.png`;
      await RNFS.writeFile(fileName, originalImage, "base64")
        .then((success) => {
          console.log("FILE WRITTEN!", `file://${fileName}`);
          setOgImage(`file://${fileName}`);
          console.log("makeAndShareImage", data?.getImageInfo());
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  return (
    <View>
      <View style={styles.main}>
        <Canvas
          ref={canvasRef}
          style={{
            width: canvas_dimension.width,
            height: canvas_dimension.width,
          }}
        >
          <Group>
            {ST.canvasElement.map((ce, index) => {
              return (
                <Element
                  key={index}
                  basePercentage={canvas_dimension.baseP}
                  rectDimension={{
                    xPos: ce.xPos,
                    yPos: ce.yPos,
                    oWidth: ce.width,
                    oHeight: ce.height,
                  }}
                  meta={ce.meta}
                  isCenter={false}
                  type={ce.type}
                />
              );
            })}
          </Group>
        </Canvas>
      </View>
      <View
        style={{ height: 200, justifyContent: "center", alignItems: "center" }}
      >
        <Pressable
          onPress={() => {
            makeAndShareImage();
          }}
          style={{
            backgroundColor: "green",
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 8,
          }}
        >
          <NativeText style={{ color: "white" }}>Create Image</NativeText>
        </Pressable>
        {ogImage && (
          <TouchableOpacity
            onPress={() => {
              const shareOptions = {
                title: "Share via",
                message: "some message",
                url: ogImage,
              };

              Share.open(shareOptions)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
            }}
          >
            <NativeImage source={{ uri: ogImage }} height={100} width={100} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(243,243,243,1)",
    borderWidth: 1,
    borderColor: "black",
  },
});
