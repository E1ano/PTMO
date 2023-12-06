import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  onOpenPhotoLibrary: () => void;
  onOpenCamera: () => void;
}

const ImageModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  onOpenPhotoLibrary,
  onOpenCamera,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <CustomButton
          isActive={true}
          text={'Camera'}
          isLoading={false}
          containerStyles={styles.cameraButton}
          textStyles={styles.defaultButtonText}
          onPress={onOpenCamera}
        />
        <CustomButton
          isActive={true}
          text={'Photo library'}
          isLoading={false}
          containerStyles={styles.photoLibraryButton}
          textStyles={styles.defaultButtonText}
          onPress={onOpenPhotoLibrary}
        />
        <CustomButton
          isActive={true}
          text={'Cancel'}
          isLoading={false}
          containerStyles={styles.cancelButton}
          textStyles={styles.cancelButtonText}
          onPress={onClose}
        />
      </View>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '33%',
    padding: 30,
  },
  cameraButton: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#81D552',
  },
  photoLibraryButton: {
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#499EEA',
  },
  defaultButtonText: {
    fontWeight: '400',
    color: '#fff',
  },
  cancelButton: {
    width: '100%',
    borderRadius: 8,
    marginTop: 30,
    backgroundColor: '#D5D5D5',
  },
  cancelButtonText: {
    fontWeight: '400',
    color: '#000',
  },
});
