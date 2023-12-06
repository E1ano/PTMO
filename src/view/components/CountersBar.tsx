import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {peopleActions} from '../../redux/slices/people.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CounterItem from './CounterItem';
import {
  NavigationContainerRef,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const CountersBar = () => {
  const likedPeople = useAppSelector(state => state.people.likedPeople);
  const dispatch = useAppDispatch();
  const navigation: NavigationContainerRef<ParamListBase> = useNavigation();

  const genderCounts = useMemo(() => {
    const counts = {
      maleCount: 0,
      femaleCount: 0,
      otherCount: 0,
    };

    likedPeople?.forEach(item => {
      if (item.gender === 'male') {
        counts.maleCount++;
      } else if (item.gender === 'female') {
        counts.femaleCount++;
      } else {
        counts.otherCount++;
      }
    });
    return counts;
  }, [likedPeople]);

  const clearFansHandler = async () => {
    dispatch(peopleActions.setLikedArr([]));
    await AsyncStorage.removeItem('likedPeople');
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Fans</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
          style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/user.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={clearFansHandler}>
          <Text style={styles.clearText}>Clear fans</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <CounterItem count={genderCounts.maleCount} text="Male Fans" />
        <CounterItem count={genderCounts.femaleCount} text="Female Fans" />
        <CounterItem count={genderCounts.otherCount} text="Others" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 6,
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  clearText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 12,
    letterSpacing: 1.02,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    height: 50,
    width: 50,
    borderColor: 'blue',
    borderRadius: 50,
  },
});

export default CountersBar;
