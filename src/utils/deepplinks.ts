import { Linking } from 'react-native';

export const linking = {
  prefixes: [
    'reactnativeseed://',
    //   "https://dev-api.websenor.com",
    //   "https://stage-api.websenor.com",
    //   "https://websenor.com",
    //   "https://deeplink.websenor.com"
  ],
  config: {
    screens: {
      // Splash: 'Splash',
      // Main: {
      //     initialRouteName: "BottomTabScreen",
      //     screens: {
      //       ProfileScreen: "profile",
      //       ViewMedicineReminder: "medication/:id",
      //       ViewAppointments: "appointment/:id",
      //     },
      // },
      // Auth: {
      //     screens: {
      //       Register: "register/:invite_id",
      //     },
      // },
    },
  },
};

//   let defaultPath = 'https://deeplink.websenor.com/?page'

export const urls = {
  // medication:`${defaultPath}=medication&id=`,
  // appointment:`${defaultPath}=appointment&id=`,
  // profile: `${defaultPath}=profile&id=`,
};
