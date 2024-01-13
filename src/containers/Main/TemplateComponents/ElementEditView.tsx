import { useAtom } from "jotai";
import { useMemo } from "react";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { sampleTemples as ST } from "../sampleTemplet";
import { ElementListAtom, activeElementID, canvasElementModeAtom } from "@/atoms/CanvasElements";
import { fontPixel, heightPixel, widthPixel } from '@/utils/responsive';

const { height, width } = Dimensions.get("window");

export default function ElementEditView() {
    const [canvasMode, setCanvasMode] = useAtom(canvasElementModeAtom);
    const [currentElementId, setCurrentID] = useAtom(activeElementID);
    const [ElementList, setElementList] = useAtom(ElementListAtom);
  
    const currentItem = useMemo(() => {
      return ElementList[currentElementId];
    }, [ElementList, currentElementId]);
  
    if (currentItem == null) {
      return <></>;
    }
  
    if (canvasMode.elementType == "TEXT") {
      return (
        <GestureHandlerRootView
          style={{
            height: height - width,
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
              width: widthPixel(220),
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            autoFocus={true}
            autoCorrect={true}
            defaultValue={currentItem.meta.text}
            onChangeText={(text) => {
              try {
                let mapped = ElementList.map((el, eli) => {
                  if (eli == currentElementId) {
                    return { ...el, meta: { ...el.meta, text } };
                  } else {
                    return el;
                  }
                });
                setElementList(mapped);
              } catch (error) {}
            }}
            onBlur={() => {
              setCanvasMode({ mode: "View", elementType: null });
            }}
          />
        </GestureHandlerRootView>
      );
    }
  
    if (canvasMode.elementType == "IMAGE") {
      return (
        <GestureHandlerRootView
          style={{
            height: heightPixel(height / 3) ,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              height: heightPixel(150) ,
              width: widthPixel(150) ,
              borderStyle: "dotted",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              launchImageLibrary({
                mediaType: "photo",
                quality: 1,
              }).then((res) => {
                if (res.assets.length > 0) {
                  // console.log(res.assets)
                  let mapped = ElementList.map((el, eli) => {
                    if (eli == currentElementId) {
                      return {
                        ...el,
                        meta: { ...el.meta, uri: res.assets[0].uri },
                      };
                    } else {
                      return el;
                    }
                  });
                  setElementList(mapped);
                  setCanvasMode({ mode: "View", elementType: null });
                }
              });
            }}
          >
            <Text>Select Image</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <TextInput
              keyboardType="number-pad"
              style={{
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1,
                width: widthPixel(100),
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              placeholder="height"
              defaultValue={currentItem.height.toString()}
              onChangeText={(text) => {
                try {
                  if (text.length) {
                    let number = parseFloat(text);
                    if (number <= ST.canvasDimensions.height) {
                      let mapped = ElementList.map((el, eli) => {
                        if (eli == currentElementId) {
                          return { ...el, height: number };
                        } else {
                          return el;
                        }
                      });
                      setElementList(mapped);
                    }
                  }
                } catch (error) {}
              }}
            />
            <View style={{ width: 10 }}></View>
            <TextInput
              keyboardType="number-pad"
              style={{
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1,
                width: widthPixel(100),
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              placeholder="width"
              defaultValue={currentItem.width.toString()}
              onChangeText={(text) => {
                try {
                  if (text.length) {
                    let number = parseFloat(text);
                    if (number <= ST.canvasDimensions.width) {
                      let mapped = ElementList.map((el, eli) => {
                        if (eli == currentElementId) {
                          return { ...el, width: number };
                        } else {
                          return el;
                        }
                      });
  
                      setElementList(mapped);
                    }
                  }
                } catch (error) {}
              }}
            />
          </View>
          <Pressable
            onPress={() => setCanvasMode({ mode: "View", elementType: null })}
          >
            <Text>Done</Text>
          </Pressable>
        </GestureHandlerRootView>
      );
    }
  
    if (canvasMode.elementType == "VECTOR") {
      return (
        <GestureHandlerRootView
          style={{
            height: heightPixel(height / 3) ,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Pressable
            style={{
              height: 150,
              width: 150,
              borderStyle: "dotted",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              launchImageLibrary({
                mediaType: "photo",
                quality: 1,
              }).then((res) => {
                if (res.assets.length > 0) {
                  // console.log(res.assets)
                  let mapped = ElementList.map((el, eli) => {
                    if (eli == currentElementId) {
                      return {
                        ...el,
                        meta: { ...el.meta, uri: res.assets[0].uri },
                      };
                    } else {
                      return el;
                    }
                  });
                  setElementList(mapped);
                  setCanvasMode({ mode: "View", elementType: null });
                }
              });
            }}
          >
            <NativeText>Select Image</NativeText>
          </Pressable> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <TextInput
              keyboardType="number-pad"
              style={{
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1,
                width: widthPixel(100) ,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              placeholder="height"
              defaultValue={currentItem.height.toString()}
              onChangeText={(text) => {
                try {
                  if (text.length) {
                    let number = parseFloat(text);
                    if (number <= ST.canvasDimensions.height) {
                      let mapped = ElementList.map((el, eli) => {
                        if (eli == currentElementId) {
                          return { ...el, height: number };
                        } else {
                          return el;
                        }
                      });
                      setElementList(mapped);
                    }
                  }
                } catch (error) {}
              }}
            />
            <View style={{ width: 10 }}></View>
            <TextInput
              keyboardType="number-pad"
              style={{
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1,
                width: widthPixel(100),
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              placeholder="width"
              defaultValue={currentItem.width.toString()}
              onChangeText={(text) => {
                try {
                  if (text.length) {
                    let number = parseFloat(text);
                    if (number <= ST.canvasDimensions.width) {
                      let mapped = ElementList.map((el, eli) => {
                        if (eli == currentElementId) {
                          return { ...el, width: number };
                        } else {
                          return el;
                        }
                      });
  
                      setElementList(mapped);
                    }
                  }
                } catch (error) {}
              }}
            />
          </View>
          <Pressable
            onPress={() => setCanvasMode({ mode: "View", elementType: null })}
          >
            <Text style={{fontSize:fontPixel(16)}}>Done</Text>
          </Pressable>
        </GestureHandlerRootView>
      );
    } else {
      return <></>;
    }
  }