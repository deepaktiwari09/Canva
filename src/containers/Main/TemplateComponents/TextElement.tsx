import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MenuList, TextList } from "../constents";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
const { height, width } = Dimensions.get("window");
import { FlatGrid } from "react-native-super-grid";

type props = {
  isVisible: boolean;
};

export default function TextElement({ isVisible }: props) {
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
      <MaterialCommunityIcons name="format-text" color={"black"} size={30} />
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
          itemDimension={width}
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
          data={TextList}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                style={{ alignItems: "center" }}
                onPress={() => onEmojiSelected(item)}
              >
                <View
                  style={{
                    // width: item.width,
                    // height: item.height,
                  }}
                />
                <Text
                  style={{
                    fontSize: item.meta.fontSize,
                    textAlign: "center",
                    marginTop: 10,
                    fontWeight: item.meta.fontWeight,
                  }}
                >
                  {item.display}
                </Text>
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

  function onEmojiSelected(text: (typeof TextList)[0]) {
    let length = 0;
    setElementList((prev) => {
      length = prev.length;
      return [...prev, text];
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
