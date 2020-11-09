import React from 'react';
import { View, Text } from 'react-native';
import AccessForm from '../components/AccessForm';
import * as Routes from '../routes';

export default function SignInPage() {
  return (
    <View style={{ flex: 1 }}>
      <AccessForm
        formTitle="Sign Up"
        buttonTitle="Sign Up"
        navigationTitle="Go to login page"
        navigationRoute={Routes.LOGIN}
      />
    </View>
  );
}
