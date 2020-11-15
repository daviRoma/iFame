import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ProfileForm from '../features/user/ProfileForm';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.loggedUser);
  return (
    <>
      {user ? (
        <ScrollView>
          <ProfileForm user={user} />
        </ScrollView>
      ) : null}
    </>
  );
}
