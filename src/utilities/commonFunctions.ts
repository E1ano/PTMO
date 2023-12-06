import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILikedPeople} from '../interfaces/people.interface';
import {isArray} from '@apollo/client/utilities';

export const fetchDataFromAsyncStorage = async (key: string) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage: ', error);
  }
};

export const storeDataToAsyncStorage = async (
  key: string,
  arr: ILikedPeople[],
) => {
  try {
    if (isArray(arr)) {
      await AsyncStorage.setItem(key, JSON.stringify(arr));
    }
  } catch (error) {
    console.error('Error storing data in AsyncStorage: ', error);
  }
};
