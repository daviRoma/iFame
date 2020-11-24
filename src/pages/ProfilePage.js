import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ProfileForm from '../features/user/ProfileForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.loggedUser);
  return (
    <>
      {user ? (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <ProfileForm user={user} />
          </ScrollView>
        </SafeAreaView>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
