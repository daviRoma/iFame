import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Accessory, Avatar, Button, Input, Text } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Tag } from '../../components';
import { emailValidator } from '../../utils';
import FoodPrefsModal from '../foodCategories/FoodPrefsModal';
import { updateUser } from './userSlice';
import Spacer from '../../components/Spacer';
import { logoutUser } from '../auth/authSlice';
import { DELETE_COLOR, SECONDARY_COLOR } from '../../common/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileForm({ user }) {
  const dispatch = useDispatch();

  const { loading, errors } = useSelector((state) => state.loggedUser);
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [preferences, setPreferencies] = useState(user.preferences);

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
        <Input
          label="Nome"
          value={name}
          onChangeText={setName}
          labelStyle={styles.label}
        />
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          labelStyle={styles.label}
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
          labelStyle={styles.label}
        />
      </View>
      <View style={styles.modalButtonContainer}>
        <FoodPrefsModal
          visible={modalVisible}
          setVisible={setModalVisible}
          foodPref={preferences}
          setFoodPref={setPreferencies}
        />
        <View style={styles.preferencesContainer}>
          <Text style={styles.label}>Preferenze di cibo:</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.label}>Modifica </Text>
            <FontAwesome name="pencil" size={20} style={styles.label} />
          </TouchableOpacity>
        </View>
        <View style={styles.tagContainer}>
          {preferences ? (
            preferences.map((value, index) => (
              <Spacer margin={3} key={index}>
                <Tag emoji={value.emoji_code} selected>
                  {value.title_it}
                </Tag>
              </Spacer>
            ))
          ) : (
            <Text>Non hai ancora nessuna preferenza</Text>
          )}
        </View>
      </View>
      <Spacer />
      <View style={styles.buttonContainer}>
        <Button
          title="Aggiorna profilo"
          containerStyle={styles.buttonStyle}
          onPress={() => {
            if (emailError === '') {
              dispatch(
                updateUser({ name, username, email, avatar, preferences }),
              );
            }
          }}
          loading={loading}
        />
        <Button
          title="Logout"
          onPress={() => dispatch(logoutUser())}
          loading={loading}
          containerStyle={styles.buttonStyle}
          buttonStyle={{ backgroundColor: DELETE_COLOR }}
          icon={{ name: 'exit-outline', type: 'ionicon', color: 'white' }}
          iconRight={true}
        />
      </View>
      {errors ? <ErrorMessage>{errors}</ErrorMessage> : null}
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
    flex: 1,
  },
  avatarLabel: {
    fontWeight: 'bold',
    // fontSize: 15,
    textAlign: 'center',
    color: SECONDARY_COLOR,
  },
  modalButtonContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonStyle: {
    flex: 1,
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  preferencesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
  },
});
