import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AccessForm from '../features/auth/AccessForm';
import * as Routes from '../routes';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../features/auth/authSlice';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../common/theme';

export default function SignInPage({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <AccessForm
        formTitle="Sign Up"
        buttonTitle="Sign Up"
        navigationTitle="Go to login page"
        navigationRoute={Routes.LOGIN}
        callback={() => {
          dispatch(signUpUser(email, password, navigation));
        }}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
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
});
