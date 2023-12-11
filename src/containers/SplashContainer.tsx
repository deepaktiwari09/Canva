import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useMemo } from "react";
import type { SplashContainerProps } from "../models/NavigatorModels";
import { MD3Theme, useTheme } from "react-native-paper";
import { navigateAndSimpleReset } from "../navigators/utils";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo'

export default function SplashContainer({
  navigation,
  route,
}: SplashContainerProps) {
  const theme = useTheme();
  const style = useMemo(() => createStyle(theme), [theme]);
  useEffect(() => {
    setTimeout(() => {
      NetInfo.fetch().then(res=>{
        if(res.isConnected){
          navigateAndSimpleReset('AuthNavigator')
        }else{
          navigateAndSimpleReset('NoInternet')
        }
      })
    }, 3000);
  }, []);

  return (
    <View style={style.root}>
      <Text style={style.heading}>B A S E</Text>
      <Text style={style.subheading}>P r o j e c t</Text>
    </View>
  );
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
      fontSize:theme.fonts.displayMedium.fontSize,
      fontFamily:theme.fonts.displayMedium.fontFamily
    },
    subheading:{
      color:theme.colors.onBackground,
      fontSize:theme.fonts.labelLarge.fontSize,
      fontFamily:theme.fonts.labelLarge.fontFamily,
      marginTop:5
    }
  });
};
