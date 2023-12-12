import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom } from "@/atoms/CanvasElements";

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
}


export default function NewElementMenu({}:props) {
    const setElementList = useSetAtom(ElementListAtom)
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
                marginHorizontal: 10,
              }}
              onPress={()=>{
                setElementList((prev)=> [...prev,item])
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "700" }}>
                {item.display}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    height:80,
    marginVertical:20
  },
});
