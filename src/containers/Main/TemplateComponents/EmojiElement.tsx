import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import { EmojiList, MenuList } from "../constents";
import { FlatGrid } from "react-native-super-grid";
import { fontPixel, heightPixel } from "@/utils/responsive";

const { height, width } = Dimensions.get("window");

type props = {
  isVisible: boolean;
};

export default function EmojiElement({ isVisible }: props) {
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
      }}
    >
      <MaterialCommunityIcons name="sticker-emoji" color={"black"} size={fontPixel(30)} />

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
          itemDimension={50}
          ListHeaderComponent={
            <View
              style={{
                width: width,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: fontPixel(18) , fontWeight: "600", color: "gray" }}>
                Choose Emoji
              </Text>
            </View>
          }
          data={EmojiList}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => onEmojiSelected(item)}>
                <Text style={{ fontSize: fontPixel(40) }}>{item}</Text>
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

  function onEmojiSelected(emoji: string) {
    let length = 0;
    setElementList((prev) => {
      length = prev.length;
      return [
        ...prev,
        { ...MenuList[3], meta: { ...MenuList[3].meta, text:emoji } },
      ];
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
    height: heightPixel(45) ,
  },
});
