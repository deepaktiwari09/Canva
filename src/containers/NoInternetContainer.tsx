import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { NoInternetContainerProps } from '../models/NavigatorModels/RootStackProps'
import { MD3Theme, useTheme } from 'react-native-paper';
import netInfo, { useNetInfo } from '@react-native-community/netinfo';
import { navigateAndSimpleReset } from '../navigators/utils';

export default function NoInternetContainer({
    navigation,
    route
}:NoInternetContainerProps) {
    const theme = useTheme();
    const style = useMemo(() => createStyle(theme), [theme]);

    useEffect(()=>{
        let unsubscribe = netInfo.addEventListener((state)=>{
            if(state.isConnected){
                navigateAndSimpleReset('Splash')
            }
        })
        return ()=>{
            unsubscribe()
        }
    },[])

  return (
    <View style={style.root}>
        
      <Text style={style.heading}>No Internet</Text>
      <Text style={style.subheading}>Pls check your internet connection</Text>
    </View>
  )
}

const createStyle = (theme: MD3Theme) => {
    return StyleSheet.create({
      root: {
        backgroundColor: theme.colors.background, 
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
      },
      heading:{
        color:theme.colors.onBackground,
        fontSize:theme.fonts.headlineMedium.fontSize,
        fontFamily:theme.fonts.headlineMedium.fontFamily
      },
      subheading:{
        color:theme.colors.onBackground,
        fontSize:theme.fonts.labelLarge.fontSize,
        fontFamily:theme.fonts.labelLarge.fontFamily,
        marginTop:5
      }
    });
  };