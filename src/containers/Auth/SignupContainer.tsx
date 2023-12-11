import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useMemo, useState } from 'react';
import { SignupContainerProps } from '../../models/NavigatorModels';
import { Button, MD3Theme, Snackbar, TextInput, useTheme } from 'react-native-paper';
import { z } from 'zod';
import { navigateAndSimpleReset } from '../../navigators/utils';
const { height, width } = Dimensions.get("window");

const formData = z.object({
  username:z.string().min(3).max(25),
  email:z.string().email(),
  password:z.string().min(6).max(10),
  confirmPassword:z.string().min(6).max(10)
}) 

export default function SignupContainer({
  navigation,
  route,
}: SignupContainerProps) {
  const theme = useTheme();
  const style = useMemo(() => createStyle(theme), [theme.colors]);
  const [username,setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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
          label="Username"
          onChangeText={(text) => setUsername(text)}
          style={style.email}
          
          outlineStyle={{
            borderRadius:20
          }}
        />
        <TextInput
          mode="outlined"
          theme={theme}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          style={style.email}
          placeholder='example@gmail.com'
          placeholderTextColor={theme.colors.outline}
          outlineStyle={{
            borderRadius:20
          }}
        />
        <TextInput
          mode="outlined"
          theme={theme}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          style={style.email}
          outlineStyle={{
            borderRadius:20
          }}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          
        />
        <TextInput
          mode="outlined"
          theme={theme}
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          style={style.email}
          outlineStyle={{
            borderRadius:20
          }}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          
        />

        <Button
          style={{ marginTop: 20,height:45,justifyContent:'center' }}
          theme={theme}
          mode="contained"
          onPress={() => {
            try {
              formData.parse({
                username,
                email,
                password,
                confirmPassword
              })
              
              navigateAndSimpleReset('Login')
            } catch (error) {
              if (error instanceof z.ZodError) {
                if(error.errors.length>1){
                  setErrorMessage('Pls fill valid information')
                  
                }else{
                  setErrorMessage(`invalid ${error.errors[0].path}`)
                }
              } else {
                setErrorMessage('An unknown error occurred.');
              }
            }
          }}
        >
          Register
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