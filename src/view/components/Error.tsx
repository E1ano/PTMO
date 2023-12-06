import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

const Error = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorMessage}>Something went wrong...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
  },
});

export default Error;
