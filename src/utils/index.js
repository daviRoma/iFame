import ImagePicker from 'react-native-image-picker';

export const emailValidator = (text, email, setEmail, setEmailError) => {
  setEmailError('');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    setEmailError('This is not a valid email address');
  }
  setEmail(text);
};

export const selectImage = (setAvatar) => {
  ImagePicker.launchImageLibrary(
    {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
    },
    (image) => {
      if (image.uri) {
        setAvatar(image.uri);
      }
    },
  );
};
