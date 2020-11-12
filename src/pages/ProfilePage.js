import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { logoutUser } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfilePage() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>ProfilePage</Text>
      <Button
        title="Logout"
        onPress={() => dispatch(logoutUser())}
        loading={loading}
      />
    </View>
  );
}
