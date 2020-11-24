import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { CONTRAST_COLOR, SECONDARY_COLOR } from '../common/theme';
import AccessForm from '../features/auth/AccessForm';
import { loginUser } from '../features/auth/authSlice';
import * as Routes from '../routes';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.title}>
        iFame
      </Text>
      <AccessForm
        formTitle="iFame"
        buttonTitle="Login"
        navigationTitle="Create an Account"
        navigationRoute={Routes.SIGNIN}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        callback={() => {
          dispatch(loginUser(email, password));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: CONTRAST_COLOR,
    fontStyle: 'italic',
    margin: 20,
  },
});
