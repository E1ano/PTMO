import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const SpinnerLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#000" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpinnerLoader;
