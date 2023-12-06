/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';
import {
  NavigationContainerRef,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageModal from '../modals/ImageModal';
import {
  requestCameraPermission,
  requestPhotoLibraryPermission,
} from '../../utilities/requestPermissions';
import {authActions} from '../../redux/slices/auth.slice';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/hooks';
import {IUser} from '../../interfaces/user.interface';

interface ICredentials {
  username: string;
  password: string;
}

interface IProps {}

const ProfileScreen: FC<IProps> = () => {
  const navigation: NavigationContainerRef<ParamListBase> = useNavigation();
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.auth.user);
  const users = useAppSelector(state => state.auth.users);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDataFromAsyncStorage = async () => {
      const currentUser: string | null = await AsyncStorage.getItem(
        'currentUser',
      );

      if (currentUser) {
        const currentUserParsed: ICredentials = JSON.parse(currentUser);
        setUsername(currentUserParsed.username);
        setPassword(currentUserParsed.password);
      }

      const currentUserInfo = await AsyncStorage.getItem('currentUser');
      if (currentUserInfo) {
        const currentUserInfoParsed = JSON.parse(currentUserInfo);
        if (currentUserInfoParsed?.profileImage) {
          setSelectedImage(currentUserInfoParsed.profileImage);
        }
      }
    };

    getDataFromAsyncStorage();
  }, []);

  const toggleModal = () => {
    setModalVisible(prevState => !prevState);
  };

  const handleImageSelection = async (data: any) => {
    if (data?.assets) {
      const newProfileImage = data.assets[0].uri as string;
      setSelectedImage(newProfileImage);

      const newUserData = {...user, profileImage: newProfileImage};
      dispatch(authActions.setUser(newUserData as IUser));

      const updatedUsers = users?.map(item => {
        if (item.username === user?.username) {
          return {...item, profileImage: newProfileImage};
        }
        return item;
      });

      dispatch(authActions.setUsers(updatedUsers as IUser[]));

      await AsyncStorage.setItem('currentUser', JSON.stringify(newUserData));
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <ImageModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onOpenPhotoLibrary={() => {
            requestPhotoLibraryPermission(setModalVisible).then(
              handleImageSelection,
            );
          }}
          onOpenCamera={() => {
            requestCameraPermission(setModalVisible).then(handleImageSelection);
          }}
        />
      </Modal>

      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            navigation.goBack();
          }}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={{flex: 1}} />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Your avatar</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage}
                  : require('../../assets/images/user.png')
              }
              style={styles.loginImage}
              onLoad={() => setLoading(false)}
              onError={error => console.error('Error loading image:', error)}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            value={username}
            onChangeText={text => {
              setUsername(text);
            }}
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.7}
          onPress={() => {
            if (username !== '' && password !== '') {
              Alert.alert('Data changed succesfully!', '', [{text: 'OK'}]);
              const newUser = {...user, username, password};
              const updatedUsers = users?.map(item => {
                if (item.username === user?.username) {
                  return newUser;
                }
                return item;
              });
              dispatch(authActions.setUser(newUser));
              if (updatedUsers) {
                dispatch(authActions.setUsers(updatedUsers));
                AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
              }
              AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
            } else {
              Alert.alert(
                'Data changing error!',
                'Fields must be fulfilled for saving data',
                {text: 'OK'},
              );
            }
          }}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#c53645'}]}
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              'Log out',
              'Are you sure you want to log out?',
              [
                {
                  text: 'Log out',
                  style: 'default',
                  onPress: () => {
                    dispatch(authActions.setUser(null));
                    AsyncStorage.removeItem('user');
                  },
                },
                {
                  text: 'Cancel',
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(142,147,163, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
    color: '#1C274C',
  },
  loginImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgb(142,147,163)',
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 16,
    padding: 15,
    borderRadius: 15,
    borderColor: 'rgb(142,147,163)',
    borderWidth: 2,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input: {
    marginLeft: 8,
    height: 20,
    paddingVertical: 0,
    color: '#1C274C',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C274C',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '90%',
    backgroundColor: '#1C274C',
    padding: 14,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
