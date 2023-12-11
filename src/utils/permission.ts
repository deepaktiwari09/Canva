import {PermissionsAndroid} from 'react-native';
import {PERMISSION, BUTTON} from './constants';

let requestStoragePermission = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			{
				title: PERMISSION.STOREAGE_PERMISSION_TITLE,
				message: PERMISSION.STOREAGE_PERMISSION_MESSAGE,
				buttonNegative: BUTTON.CANCEL_BUTTON,
				buttonPositive: BUTTON.OK_BUTTON,
			},
		);

		return granted === PermissionsAndroid.RESULTS.GRANTED;
	} catch (err) {
		console.warn(err);
	}
};

let requestCamera = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA,
			{
				title: PERMISSION.CAMERA_PERMISSION_TITLE,
				message: PERMISSION.CAMERA_PERMISSION_MESSAGE,
				buttonNegative: BUTTON.CANCEL_BUTTON,
				buttonPositive: BUTTON.OK_BUTTON,
			},
		);

		return granted === PermissionsAndroid.RESULTS.GRANTED;
	} catch (err) {
		console.warn(err);
	}
};

let requestContacts = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
			{
				title: PERMISSION.CONTECT_PERMISSION_TITLE,
				message: PERMISSION.CONTACT_PERMISSION_MESSAGE,
				buttonNegative: BUTTON.CANCEL_BUTTON,
				buttonPositive: BUTTON.OK_BUTTON,
			},
		);
		let res = granted === PermissionsAndroid.RESULTS.GRANTED;
		return res;
	} catch (err) {
		console.warn(err);
	}
};

export {requestStoragePermission, requestCamera, requestContacts};
