import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';

interface IProps {
  goPrev: () => void;
  goNext: () => void;
  currPage: number;
  pageAmount: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
}
const Pagination: FC<IProps> = ({
  goPrev,
  goNext,
  currPage,
  pageAmount,
  prevDisabled,
  nextDisabled,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goPrev}
        disabled={prevDisabled}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <ArrowLeftIcon />
      </TouchableOpacity>
      <Text style={styles.counter}>
        {currPage} / {pageAmount}
      </Text>
      <TouchableOpacity
        onPress={goNext}
        disabled={nextDisabled}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <ArrowRightIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 16,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counter: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Pagination;
