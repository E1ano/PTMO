import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  title: string;
  value: string | number;
}
const PeopleTextBlock: FC<IProps> = ({title, value}) => {
  return (
    <View style={styles.textBLock}>
      <Text style={styles.title}>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBLock: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingBottom: 3,
  },
  title: {
    width: 130,
    fontWeight: '500',
    color: '#646464',
  },
});
export default PeopleTextBlock;
