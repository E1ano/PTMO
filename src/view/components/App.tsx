import React, {useEffect} from 'react';
import RootNavigation from '../navigation/RootNavigation';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {authActions} from '../../redux/slices/auth.slice';

export const App = () => {
  const dispatch = useAppDispatch();
  const BASE_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

  const user = useAppSelector(state => state.auth.user);

  const client = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
  });

  // AsyncStorage.clear();
  // dispatch(authActions.setUser(null));
  // dispatch(authActions.setUsers(null));

  useEffect(() => {
    const getDataFromAsyncStorage = async () => {
      const credentials = await AsyncStorage.getItem('currentUser');
      if (credentials) {
        dispatch(authActions.setUser(JSON.parse(credentials)));
      }

      const storageUsers = await AsyncStorage.getItem('users');
      if (storageUsers) {
        dispatch(authActions.setUsers(JSON.parse(storageUsers)));
      }
    };

    getDataFromAsyncStorage();

    const initializeAsyncStorage = async () => {
      const initialUser = {
        username: 'Admin',
        password: 'Admin',
      };

      const usersArrayString = await AsyncStorage.getItem('users');
      const usersArray = usersArrayString ? JSON.parse(usersArrayString) : [];

      const updatedUsers = [...new Set([...usersArray, initialUser])];

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    initializeAsyncStorage();
  }, []);

  return (
    <ApolloProvider client={client}>
      {user ? <RootNavigation /> : <LoginScreen />}
    </ApolloProvider>
  );
};
