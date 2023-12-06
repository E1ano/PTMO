import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from '../../redux/slices/auth.slice';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/hooks';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const users = useAppSelector(state => state.auth.users);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.loginImage}
        />
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
            const authenticationData = users?.find(
              item => item.username === username && item.password === password,
            );

            if (!authenticationData) {
              Alert.alert(
                'Authentication error!',
                'Wrong username or password',
                [{text: 'OK'}],
              );
            } else {
              dispatch(authActions.setUser(authenticationData));
              AsyncStorage.setItem(
                'currentUser',
                JSON.stringify(authenticationData),
              );
            }
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#1C278C'}]}
          activeOpacity={0.7}
          onPress={() => {
            if (username && password) {
              const usernameExist = users?.find(
                item => item.username === username,
              );

              if (usernameExist) {
                Alert.alert(
                  'Register error!',
                  'Accout with this username has been registered yet',
                  [{text: 'OK'}],
                );
              } else {
                Alert.alert('Account created succesfully!', '', [{text: 'OK'}]);
                const newUser = {username, password};
                dispatch(authActions.setUser(newUser));
                AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
                if (users) {
                  dispatch(authActions.setUsers([...users, newUser]));
                  AsyncStorage.setItem(
                    'users',
                    JSON.stringify([...users, newUser]),
                  );
                }
              }
            } else {
              Alert.alert('Register error!', 'All fields is required', [
                {text: 'OK'},
              ]);
            }
          }}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 16,
  },
  loginImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
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
