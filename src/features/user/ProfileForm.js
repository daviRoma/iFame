import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Accessory, Avatar, Button, Input, Text } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import { emailValidator } from '../../utils';
import FoodPrefsModal from '../foodCategories/FoodPrefsModal';
import { updateUser } from './userSlice';
import Spacer from '../../components/Spacer';
import { logoutUser } from '../auth/authSlice';

export default function ProfileForm({ user }) {
  const dispatch = useDispatch();

  const { loading, errors } = useSelector((state) => state.loggedUser);
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [preferencies, setPreferencies] = useState(user.preferencies);

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      async (image) => {
        if (image.data) {
          const ref = storage().ref(image.fileName);
          await ref.putFile(image.path);
          const url = await ref.getDownloadURL();
          setAvatar(url);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.avatarLabel}>Aggiorna l'immagine del profilo</Text>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Avatar
            source={{
              uri: avatar,
            }}
            onPress={() => selectImage(setAvatar)}>
            <Accessory />
          </Avatar>
        ) : (
          <Avatar
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => selectImage(setAvatar)}>
            <Accessory />
          </Avatar>
        )}
      </View>
      <View style={styles.formContainer}>
        <Input label="Nome" value={name} onChangeText={setName} />
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={(text) =>
            emailValidator(text, email, setEmail, setEmailError)
          }
          errorMessage={emailError}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.modalButtonContainer}>
        <FoodPrefsModal
          visible={modalVisible}
          setVisible={setModalVisible}
          foodPref={preferencies}
          setFoodPref={setPreferencies}
        />
        <Button
          title="Preferenze di cibo"
          type="clear"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Button
        title="Aggiorna profilo"
        type="clear"
        titleStyle={{
          color: 'green',
        }}
        onPress={() => {
          if (emailError === '') {
            dispatch(
              updateUser({ name, username, email, avatar, preferencies }),
            );
          }
        }}
        loading={loading}
      />
      {errors ? <ErrorMessage>{errors}</ErrorMessage> : null}
      <Spacer />
      <View style={styles.logoutButtonContainer}>
        <Button
          title="Logout"
          onPress={() => dispatch(logoutUser())}
          loading={loading}
          containerStyle={styles.buttonStyle}
          buttonStyle={{ backgroundColor: 'red' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    margin: 20,
  },
  formContainer: {
    alignContent: 'center',
  },
  container: {
    margin: 20,
    alignContent: 'center',
  },
  avatarLabel: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
  },
  modalButtonContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    flex: 1,
    width: 100,
    backgroundColor: 'red',
  },
  logoutButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
