import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { ForgotPasswordContainerProps } from '../../models/NavigatorModels/AuthStackProps';
import { Button, MD3Theme, Snackbar, TextInput, useTheme } from 'react-native-paper';
import { z } from 'zod';
import { navigateAndSimpleReset } from '../../navigators/utils';

const { height, width } = Dimensions.get("window");


export default function ForgotPasswordContainer({
  navigation,
  route,
}: ForgotPasswordContainerProps) {
  const theme = useTheme();
  const style = useMemo(() => createStyle(theme), [theme.colors]);
  const [email, setEmail] = useState<string>("");
  const [errorMessage,setErrorMessage] = useState<string>('')
  return (
    <View style={style.root}>
      <View style={style.container}>
        <Text style={style.heading}>B A S E</Text>
        <Text style={style.subheading}>
          P r o j e c t  <Text style={style.link} onPress={()=> navigation.navigate('Login')}>Login</Text>
        </Text>
      </View>
      <View style={style.container}>

        <TextInput
          mode="outlined"
          theme={theme}
          label="Email"
          placeholder='example@gmail.com'
          placeholderTextColor={theme.colors.outline}
          onChangeText={(text) => setEmail(text)}
          style={style.email}
          outlineStyle={{
            borderRadius:20
          }}
        />
        

        <Button
          style={{ marginTop: 20,height:45,justifyContent:'center' }}
          theme={theme}
          mode="contained"
          onPress={() => {
            let zEmail = z.string().email()
            try{
              zEmail.parse(email)
              navigateAndSimpleReset('Login')
            }catch(error){
              setErrorMessage('invalid email')
            }
          }}
        >
          Verify
        </Button>
      </View>
      <View style={[style.container,{alignItems:'center'}]}>
        <Text style={style.buildText}>Build Version: {`0.0.1(1)`} </Text>
        <Text style={style.buildNoText}>Server: Development</Text>
      </View>
      <Snackbar
        visible={errorMessage.length>0}
        onDismiss={()=> setErrorMessage('')}
        >
        {errorMessage}
      </Snackbar>
    </View>
  );
}

const createStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background,
      flex: 1,
      alignItems: "center",
      paddingTop: 30,
      justifyContent: "space-between",
    },
    container: {
      flexGlow: 1,
      width: width,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    email: {
      borderRadius: 30,
      marginVertical: 5,
    },
    heading: {
      color: theme.colors.onBackground,
      fontSize: theme.fonts.displayMedium.fontSize,
      fontFamily: theme.fonts.displayMedium.fontFamily,
    },
    subheading: {
      color: theme.colors.onBackground,
      fontSize: theme.fonts.labelLarge.fontSize,
      fontFamily: theme.fonts.labelLarge.fontFamily,
      marginTop: 5,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: "underline",
    },
    buildText:{
      color:theme.colors.onBackground,
      fontSize:theme.fonts.titleMedium.fontSize
    },
    buildNoText:{
      color:theme.colors.onBackground,
      fontSize:theme.fonts.bodySmall.fontSize
    }
  });