import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";
import Entypo from "react-native-vector-icons/Entypo";

const MenuList = [
  {
    type: "TEXT",
    display: "New Text",
    xPos: 10,
    yPos: 10,
    height: 100,
    width: 100,
    meta: {
      text: "New Text",
      fontSize: 32,
      fontWeight: "700",
      fontColor: "black",
    },
  },
  {
    type: "IMAGE",
    display: "New Image",
    xPos: 0,
    yPos: 0,
    height: 500,
    width: 500,
    meta: {
      uri: "https://marketplace.canva.com/EAFCO6pfthY/1/0/1600w/canva-blue-green-watercolor-linktree-background-F2CyNS5sQdM.jpg",
    },
  },
  {
    type: "VECTOR",
    display: "New Vector",
    xPos: 10,
    yPos: 10,
    height: 100,
    width: 100,
    meta: {
      roundness: 25,
      backgroundColor: "white",
    },
  },
];

type props = {
  onSharePostPressed: () => void;
};

export default function NewElementMenu({ onSharePostPressed }: props) {
  const [elements, setElementList] = useAtom(ElementListAtom);
  const setActiveIndex = useSetAtom(activeElementID);
  return (
    <View style={styles.main}>
      <FlatList
        horizontal={true}
        data={MenuList}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: "rgba(150,200,250,1)",
                marginHorizontal: 5,
                maxHeight:45
              }}
              onPress={() => {
                setElementList((prev) => [...prev, item]);
                setActiveIndex(elements.length);
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "700" }}>
                {item.display}
              </Text>
            </Pressable>
          );
        }}
        ListFooterComponent={
          <Pressable onPress={onSharePostPressed}>
            <Entypo name="share" size={28} color={"green"} />
          </Pressable>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    marginVertical: 10,
  },
});
