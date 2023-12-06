import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  Image,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';

interface IProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
  containerStyles?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  textStyles?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  isLoading?: boolean;
}

const CustomButton: React.FC<IProps> = ({
  isLoading,
  text,
  isActive,
  containerStyles,
  textStyles,
  onPress,
}) => {
  const isClickable = isActive && !isLoading;

  return (
    <Pressable
      onPress={isClickable ? onPress : null}
      style={[
        styles.buttonContainer,
        ...(Array.isArray(containerStyles)
          ? containerStyles
          : [containerStyles]),
        !isClickable && {backgroundColor: '#D5D5D5'},
      ]}>
      {isLoading ? (
        <View />
        // <Image
        //   style={styles.loadingGif}
        //   source={require('../../view/assets/images/loading.gif')}
        // />
      ) : (
        <Text
          style={[
            styles.buttonText,
            ...(Array.isArray(textStyles) ? textStyles : [textStyles]),
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 14,
    backgroundColor: '#81D552',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  loadingGif: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
});
