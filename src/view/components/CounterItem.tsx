import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  count: number;
  text: string;
}
const CounterItem: FC<IProps> = ({count, text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '31%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 1,
  },
  counter: {
    fontSize: 20,
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
    color: '#545454',
  },
});
export default CounterItem;
