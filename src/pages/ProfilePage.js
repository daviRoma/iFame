import React from 'react';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import ProfileForm from '../features/user/ProfileForm';

export default function ProfilePage() {
  const { loading } = useSelector((state) => state.auth);
  const { user, errors } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  return (
    <>
      {user ? (
        <ScrollView>
          <ProfileForm user={user} />
          <Button
            title="Logout"
            onPress={() => dispatch(logoutUser())}
            loading={loading}
          />
        </ScrollView>
      ) : null}
    </>
  );
}
