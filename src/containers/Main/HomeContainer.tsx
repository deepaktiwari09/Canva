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
import { Canvas, Group, useCanvasRef } from "@shopify/react-native-skia";
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
import SingleElement from "@/components/TemplateComponets/SingleElement";
import ViewShot from "react-native-view-shot";

export default function HomeContainer({
  navigation,
  route,
}: HomeContainerProps) {
  const { width, height } = useWindowDimensions();
  const ref = useRef();
  const [ogImage, setOgImage] = useState<string | null>(null);

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

  async function makeAndShareImage() {
    ref.current.capture().then((uri) => {
      console.log("do something with ", uri);
      setOgImage(uri);
    });
    // let data = canvasRef.current?.makeImageSnapshot();
    // let originalImage = data?.encodeToBase64();

    // if (originalImage) {
    //   let fileName = `${RNFS.DocumentDirectoryPath}/Canva_${dayjs().format(
    //     "YYYYMMDD_hh_mm_ss"
    //   )}.png`;
    //   await RNFS.writeFile(fileName, originalImage, "base64")
    //     .then((success) => {
    //       console.log("FILE WRITTEN!", `file://${fileName}`);
    //       setOgImage(`file://${fileName}`);
    //       console.log("makeAndShareImage", data?.getImageInfo());
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // }
  }

  function shareImage() {
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
  }

  return (
    <View>
      <ViewShot
        ref={ref}
        style={styles.main}
        options={{
          fileName: `Canva_${dayjs().format("YYYYMMDD_hh_mm_ss")}`,
          format: "png",
          quality: 0.9,
        }}
      >
        <View

          style={{
            width: canvas_dimension.width,
            height: canvas_dimension.width,
          }}
        >
          {ST.canvasElement.map((ce, index) => {
            return (
              <SingleElement
                key={index}
                basePercentage={canvas_dimension.baseP}
                rectDimensionData={{
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
      </ViewShot>

      <View style={styles.bottomSection}>
        <Pressable onPress={makeAndShareImage} style={styles.button}>
          <NativeText style={{ color: "white" }}>Create Image</NativeText>
        </Pressable>
        {ogImage && (
          <TouchableOpacity onPress={shareImage}>
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
  button: {
    backgroundColor: "green",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bottomSection: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
