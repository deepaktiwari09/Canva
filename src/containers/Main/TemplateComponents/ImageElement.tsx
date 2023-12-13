import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MenuList } from "../constents";
import { launchImageLibrary } from "react-native-image-picker";

type props = {
  isVisible: boolean;
};

export default function ImageElement({ isVisible }: props) {
  const setElementList = useSetAtom(ElementListAtom);
  const setActiveIndex = useSetAtom(activeElementID);

  if (!isVisible) {
    return <></>;
  }
  return (
    <Pressable
      style={styles.elementBox}
      onPress={() => {
        launchImageLibrary({
          mediaType: "photo",
          quality: 1,
        }).then((res) => {
          if (res.assets.length > 0) {
            if(res.assets[0].uri){
                let length = 0
                setElementList((prev) => {
                    length = prev.length 
                    return [
                  ...prev,
                  {
                    ...MenuList[1],
                    meta: { ...MenuList[1].meta, uri: res.assets[0].uri },
                  },
                ]});
                setActiveIndex(length);
            }
          }
        });
      }}
    >
      <MaterialCommunityIcons name="image-outline" color={"black"} size={30} />
    </Pressable>
  );
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
