import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import FoodPrefsModal from '../features/foodCategories/FoodPrefsModal';
import * as Routes from '../routes';
import { loadFoodPref } from '../features/user/userSlice';
import { FloatingButton } from '../components';
import { Text } from 'react-native-elements';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [preferences, setPreferencies] = useState([]);

  return (
    <>
      {loading ? (
        <ActivityIndicator size={30} />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {user && !user.preferences.length ? (
            <FoodPrefsModal
              visible={visible}
              onClose={() => {
                dispatch(loadFoodPref(preferences));
              }}
              setVisible={setVisible}
              foodPref={preferences}
              setFoodPref={setPreferencies}
            />
          ) : null}
          <Text h2>Benvenuto in iFame!</Text>
          <FloatingButton
            clickHandler={() => {
              navigation.navigate(Routes.NEW_EVENT_FIRST);
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}
