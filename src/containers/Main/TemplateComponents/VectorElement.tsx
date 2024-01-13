import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import { MenuList, VectorList } from "../constents";
const { height, width } = Dimensions.get("window");
import { FlatGrid } from "react-native-super-grid";
import { fontPixel } from "@/utils/responsive";

type props = {
  isVisible: boolean;
};

export default function VectorElement({ isVisible }: props) {
  const setElementList = useSetAtom(ElementListAtom);
  const setActiveIndex = useSetAtom(activeElementID);
  const sheetRef = useRef<RBSheetProps>(null);

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
      <MaterialCommunityIcons name="vector-square" color={"black"} size={fontPixel(30) } />
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
        height={height / 1.8}
      >
        <FlatGrid
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
              <Pressable style={{alignItems:'center',marginBottom:15}} onPress={() => onEmojiSelected(item)}>
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
                <Text style={{ fontSize: 14,textAlign:'center',marginTop:10 }}>{item.display}</Text>
              </Pressable>
            );
          }}
        />
      </RBSheet>
    </Pressable>
  );
  function onIconPressed() {
    sheetRef.current?.open();
  }

  function onEmojiSelected(vector: (typeof VectorList)[0]) {
    let length = 0;
    setElementList((prev) => {
      length = prev.length;
      return [...prev, vector];
    });
    setActiveIndex(length);
    sheetRef.current?.close();
  }
}

const styles = StyleSheet.create({
  elementBox: {
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
});
