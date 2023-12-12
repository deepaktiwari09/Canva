import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
  Text as NativeText,
  Image as NativeImage,
  TouchableOpacity,
  Dimensions,
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
import ElementMovementController from "@/components/TemplateComponets/ElementMovementController";
import NewElementMenu from "@/components/TemplateComponets/NewElementMenu";
import { useAtom, useAtomValue } from "jotai";
import {
  ElementListAtom,
  activeElementID,
  canvasElementModeAtom,
} from "@/atoms/CanvasElements";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

export default function HomeContainer({
  navigation,
  route,
}: HomeContainerProps) {
  const ref = useRef();
  const [ogImage, setOgImage] = useState<string | null>(null);
  const ElementList = useAtomValue(ElementListAtom);
  const [canvasMode, setCanvasMode] = useAtom(canvasElementModeAtom);

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
          {ElementList.map((ce, index) => {
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
      {canvasMode.mode == "View" ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height / 2,
          }}
        >
          <ElementMovementController />
          <NewElementMenu />
        </View>
      ) : (
        <ElementEditView />
      )}

      {/* <View style={styles.bottomSection}>
        <Pressable onPress={makeAndShareImage} style={styles.button}>
          <NativeText style={{ color: "white" }}>Create Image</NativeText>
        </Pressable>
        {ogImage && (
          <TouchableOpacity onPress={shareImage}>
            <NativeImage source={{ uri: ogImage }} height={100} width={100} />
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(243,243,243,1)",
    borderWidth: 1,
    borderColor: "black",
    height: height / 2,
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

function ElementEditView() {
  const [canvasMode, setCanvasMode] = useAtom(canvasElementModeAtom);
  const [currentElementId, setCurrentID] = useAtom(activeElementID);
  const [ElementList,setElementList] = useAtom(ElementListAtom);

  const currentItem = useMemo(() => {
    if (ElementList && currentElementId) {
      return ElementList[currentElementId];
    } else {
      return null;
    }
  }, [ElementList, currentElementId]);


  if (currentItem == null) {
    return <></>;
  }

  if (canvasMode.elementType == "TEXT") {
    return (
      <GestureHandlerRootView
        style={{
          height: height / 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
         
          placeholder="Text"
          style={{
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 1,
            width: 220,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          autoFocus={true}
          autoCorrect={true}
          defaultValue={currentItem.meta.text}
          onChangeText={(text)=>{
            try {
   
              let mapped = ElementList.map((el,eli)=>{
                if(eli == currentElementId){
                  return {...el,meta:{...el.meta,text}}
                }else{
                  return el
                }
              })
              setElementList(mapped)

            } catch (error) {
              
            }
          }}
          onBlur={()=>{
            setCanvasMode({mode:'View',elementType:null})
          }}
        />
      </GestureHandlerRootView>
    );
  } else {
    return <></>;
  }
}
