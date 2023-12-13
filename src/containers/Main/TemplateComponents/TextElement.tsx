import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MenuList } from "../constents";

type props = {
  isVisible: boolean;
};

export default function TextElement({ isVisible }: props) {
  const setElementList = useSetAtom(ElementListAtom);
  const setActiveIndex = useSetAtom(activeElementID);

  if (!isVisible) {
    return <></>;
  }
  return (
    <Pressable
      style={styles.elementBox}
      onPress={() => {
        let length = 0
        setElementList((prev) => {
            length = prev.length
            return [...prev, MenuList[0]]});
        setActiveIndex(length);
      }}
    >
      <MaterialCommunityIcons name="format-text" color={"black"} size={30} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  elementBox: {
    borderRadius: 10,
    backgroundColor: "rgba(150,200,250,1)",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
});
