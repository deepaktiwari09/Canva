import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureEvent, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import { useAtom, useSetAtom } from 'jotai'
import { activeElementAtom } from '@/atoms/CanvasElements'

export default function ElementMovementController() {
    const setRectDimension = useSetAtom(activeElementAtom)
    function onGestureHandler(event: GestureEvent<PanGestureHandlerEventPayload>){
        console.log(event.nativeEvent.x,event.nativeEvent.y)
        setRectDimension({x:event.nativeEvent.x,y:event.nativeEvent.y})
    }

  return (
    <GestureHandlerRootView style={styles.main}> 
        <PanGestureHandler onGestureEvent={onGestureHandler}>
            <View style={{flex:1,backgroundColor:'red'}}></View>
        </PanGestureHandler>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
    main:{
        height:250,
        width:250,
        
        backgroundColor:'rgba(200,200,200,1)',
        borderRadius:20,
        overflow:'hidden'
    }
})