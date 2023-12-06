import React, {FC} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import SearchIcon from '../../assets/icons/SearchIcon';

interface IProps {
  placeholder: string;
  changeTextHandler: (search: string) => void;
  addIcon?: boolean;
}
const CustomInput: FC<IProps> = ({placeholder, changeTextHandler, addIcon = true}) => {
  return (
    <View style={styles.inputContainer}>
      {addIcon && <SearchIcon />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => {
          changeTextHandler(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 12,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 1,
  },
  input: {
    marginLeft: 8,
    height: 18,
    paddingVertical: 0,
  },
});
export default CustomInput;
