import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Avatar, Accessory } from 'react-native-elements';
import { updateUser } from './userSlice';
import { emailValidator, selectImage } from '../../utils';

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { user, loading, errors } = useSelector((state) => state.loggedUser);
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Avatar
            rounded
            size="large"
            source={{
              uri: avatar,
            }}
            onPress={() => selectImage(setAvatar)}>
            <Accessory />
          </Avatar>
        ) : (
          <Avatar
            rounded
            size="large"
            icon={{ name: 'user', type: 'font-awesome' }}
            activeOpacity={0.7}
            containerStyle={{ backgroundColor: 'rgb(119, 119, 119)' }}
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
      <Button
        title="Aggiorna profilo"
        onPress={() => {
          if (emailError === '') {
            dispatch(updateUser({ name, username, email, avatar }));
          }
        }}
        loading={loading}
      />
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
    margin: 10,
  },
  container: {
    margin: 20,
  },
});
