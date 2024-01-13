import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  CanvasBackgroundAtom,
  ElementListAtom,
  activeElementID,
} from "@/atoms/CanvasElements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import {
  BackgroundColorList,
  BackgroundImageList,
  MenuList,
  VectorList,
} from "../constents";
import { launchImageLibrary } from "react-native-image-picker";
import { fontPixel, heightPixel, widthPixel } from "@/utils/responsive";

const { height, width } = Dimensions.get("window");

type props = {
  isVisible: boolean;
};

export default function CanvasBackgroundElement({ isVisible }: props) {
  const setElementList = useSetAtom(ElementListAtom);
  const setActiveIndex = useSetAtom(activeElementID);
  const sheetRef = useRef<RBSheetProps>(null);
  const SetCanvasBackground = useSetAtom(CanvasBackgroundAtom);

  if (!isVisible) {
    return <></>;
  }
  return (
    <Pressable
      style={styles.elementBox}
      onPress={() => {
        onIconPressed();
        // let length = 0
        // setElementList((prev) => {
        //     length = prev.length
        //     return [...prev, MenuList[2]]});
        // setActiveIndex(length);
      }}
    >
      <MaterialCommunityIcons
        name="image-filter-hdr"
        color={"black"}
        size={fontPixel(30)}
      />
      <RBSheet
        ref={sheetRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        height={height / 1.5}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              alignItems: "center",
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            <Text style={{ fontSize: fontPixel(18) , fontWeight: "600", color: "gray" }}>
              Choose Background
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Pressable
              style={{
                height: heightPixel(100),
                width: widthPixel(100) ,
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 10,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                launchImageLibrary({
                  mediaType: "photo",
                  quality: 1,
                }).then((res) => {
                  if (res.assets.length > 0) {
                    if (res.assets[0].uri) {
                      SetCanvasBackground({
                        width: 500,
                        height: 500,
                        background: {
                          color: "white",
                          uri: res.assets[0].uri,
                        },
                      });
                      sheetRef.current?.close();
                    }
                  }
                });
              }}
            >
              <MaterialCommunityIcons
                name="image-area"
                size={fontPixel(32)}
                color={"black"}
              />
              <Text style={{fontSize:fontPixel(16)}}>Gallery</Text>
            </Pressable>
            {/* <Pressable
              style={{
                height: 100,
                width: 100,
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 10,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="camera" size={32} color={"black"} />
              <Text>Camera</Text>
            </Pressable> */}
          </View>

          <Text
            style={{
              fontSize: fontPixel(18),
              marginHorizontal: 20,
              marginBottom: 15,
              marginTop: 20,
              fontWeight: "700",
            }}
          >
            {"Colors"}
          </Text>
          <View style={{ width: width, paddingLeft: 15 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 10 }}
              horizontal={true}
              data={BackgroundColorList}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{
                      height: heightPixel(60) ,
                      width: widthPixel(60) ,
                      borderRadius: 50,
                      marginHorizontal: 5,
                      backgroundColor: item.background.color,
                    }}
                    onPress={() => {
                      SetCanvasBackground(item);
                      sheetRef.current?.close();
                    }}
                  />
                );
              }}
            />
          </View>

          <Text
            style={{
              fontSize: fontPixel(18),
              marginHorizontal: 20,
              marginBottom: 15,
              marginTop: 20,
              fontWeight: "700",
            }}
          >
            {"Images"}
          </Text>
          <View style={{ width: width, paddingLeft: 15 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 10 }}
              horizontal={true}
              data={BackgroundImageList}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      SetCanvasBackground(item);
                      sheetRef.current?.close();
                    }}
                  >
                    <Image
                      style={{
                        height: heightPixel(100),
                        width: widthPixel(100) ,
                        borderRadius: 10,
                        marginHorizontal: 5,
                      }}
                      source={{
                        uri: item.background.uri,
                      }}
                    />
                  </Pressable>
                );
              }}
            />
          </View>
        </View>

        {/* <SectionGrid
          ListHeaderComponent={
            <View
              style={{
                width: width,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 50,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Choose Shapes
              </Text>
            </View>
          }
          itemDimension={100}
          sections={[
            {
              title: "Colors",
              data: BackgroundColorList,
            },
            {
              title: "Images",
              data: BackgroundImageList,
            },
          ]}
          renderItem={({ item }) => {
            if (item.background.uri.length != 0) {
              return (
                <Image
                  style={{ height: 100, width: 100, borderRadius: 10 }}
                  source={{
                    uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702425600&semt=sph",
                  }}
                />
              );
            } else {
              return (
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    backgroundColor: item.background.color,
                  }}
                />
              );
            }
          }}
          renderSectionHeader={({ section }) => (
            <Text
              style={{ fontSize: 20, marginHorizontal: 20, marginVertical: 10 }}
            >
              {section.title}
            </Text>
          )}
        /> */}
        {/* <FlatGrid
          itemDimension={width / 3}
          ListHeaderComponent={
            <View
              style={{
                width: width,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 50,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Choose Shapes
              </Text>
            </View>
          }
          data={VectorList}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                style={{ alignItems: "center", marginBottom: 15 }}
                onPress={() => onEmojiSelected(item)}
              >
                <View
                  style={{
                    width: item.width,
                    height: item.height,
                    borderRadius: item.meta.roundness,
                    backgroundColor: item.meta.backgroundColor ?? "red",
                    borderColor: item.meta.borderColor,
                    borderWidth: item.meta.borderWidth,
                  }}
                />
                <Text
                  style={{ fontSize: 14, textAlign: "center", marginTop: 10 }}
                >
                  {item.display}
                </Text>
              </Pressable>
            );
          }}
        /> */}
      </RBSheet>
    </Pressable>
  );
  function onIconPressed() {
    sheetRef.current?.open();
  }
}

const styles = StyleSheet.create({
  elementBox: {
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: heightPixel(45) ,
  },
});
