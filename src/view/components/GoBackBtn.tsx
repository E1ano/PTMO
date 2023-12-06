import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GoBackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
      <Text style={styles.backText}>&larr;</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 1,
  },
  backText: {
    fontSize: 20,
    color: '#000000',
  },
});

export default GoBackBtn;
