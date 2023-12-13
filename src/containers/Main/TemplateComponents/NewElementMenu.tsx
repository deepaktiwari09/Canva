import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { ElementListAtom, activeElementID } from "@/atoms/CanvasElements";

import { SimpleGrid } from "react-native-super-grid";
import TextElement from "./TextElement";
import { MenuList } from "../constents";
import VectorElement from "./VectorElement";
import ImageElement from "./ImageElement";
import EmojiElement from "./EmojiElement";

type props = {
  onSharePostPressed: () => void;
};

export default function NewElementMenu({ onSharePostPressed }: props) {

  return (
    <View style={styles.main}>
      <SimpleGrid
        itemDimension={55}
        data={MenuList}
        style={{maxWidth:150}}
        renderItem={({ item }) => {
          return (
            <View>
              <TextElement isVisible={item.type == 'TEXT'}/>
              <VectorElement isVisible={item.type == 'VECTOR'}/>
              <ImageElement isVisible={item.type == 'IMAGE'}/>
              <EmojiElement isVisible={item.type == 'EMOJI'}/>
            </View>
          );
        }}
        listKey={"1"}
      />
      {/* <FlatList
        
        data={MenuList}
        renderItem={({ item, index }) => {
          return (
            
          );
        }}
        ListFooterComponent={
          <Pressable onPress={onSharePostPressed}>
            <Entypo name="share" size={28} color={"green"} />
          </Pressable>
        }
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius:20,
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal:5,
    width: 155,

  },
  elementBox: {
    borderRadius: 10,
    backgroundColor: "rgba(150,200,250,1)",
    justifyContent: "center",
    alignItems: "center",
    height:45
  },
});


