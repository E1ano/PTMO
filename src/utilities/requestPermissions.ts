import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const openGalleryHandler = (
  setModalVisible: (isVisible: boolean) => void,
  selectionLimit = 1,
) => {
  return launchImageLibrary(
    {
      selectionLimit,
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 0.6,
    },
    (response: ImagePickerResponse) => {
      setModalVisible(false);

      if (response.errorMessage) {
        console.error('Error occurred while picking image');
      } else if (response.assets) {
        const uries = response.assets.map(({uri}) => uri as string);
        return uries;
      }
    },
  );
};

export const requestPhotoLibraryPermission = async (
  setModalVisible: (isVisible: boolean) => void,
  selectionLimit?: number,
) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Permission Request',
          message: 'This app needs permission to access your photo library.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const uries = await openGalleryHandler(setModalVisible, selectionLimit);
        return uries;
      } else {
        Alert.alert(
          'Permisson error!',
          'Grant permission to use the gallery.',
          [{text: 'OK', style: 'destructive'}],
        );
      }
    } else if (Platform.OS === 'ios') {
      const permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

      if (
        permissionStatus === RESULTS.GRANTED ||
        permissionStatus === RESULTS.LIMITED
      ) {
        const uries = await openGalleryHandler(setModalVisible, selectionLimit);
        return uries;
      } else {
        Alert.alert(
          'Permisson error!',
          'Grant permission to use the gallery.',
          [{text: 'OK', style: 'destructive'}],
        );
      }
    }
  } catch (error) {
    console.error('Error requesting photo library permission:', error);
  }
};

const openCameraHandler = (setModalVisible: (isVisible: boolean) => void) => {
  return launchCamera(
    {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 0.6,
      saveToPhotos: true,
    },
    (response: ImagePickerResponse) => {
      setModalVisible(false);

      if (response.errorMessage) {
        console.error('Error occurred while picking image');
      } else if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;
        return uri;
      }
    },
  );
};

export const requestCameraPermission = async (
  setModalVisible: (isVisible: boolean) => void,
) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permission Request',
          message: 'This app needs permission to access your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const uri = await openCameraHandler(setModalVisible);
        return uri;
      } else {
        Alert.alert('Permisson error!', 'Grant permission to use the camera.', [
          {text: 'OK', style: 'destructive'},
        ]);
      }
    } else if (Platform.OS === 'ios') {
      const permissionStatus = await request(PERMISSIONS.IOS.CAMERA);

      if (permissionStatus === RESULTS.GRANTED) {
        const uri = await openCameraHandler(setModalVisible);
        return uri;
      } else {
        Alert.alert('Permisson error!', 'Grant permission to use the camera.', [
          {text: 'OK', style: 'destructive'},
        ]);
      }
    }
  } catch (error) {
    console.error('Error requesting camera permission:', error);
  }
};
