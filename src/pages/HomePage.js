import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingButton } from '../components';
import FoodPrefsModal from '../features/foodCategories/FoodPrefsModal';
import {
  loadFoodPref,
  storeInformationFail,
  storeUserPosition,
} from '../features/user/userSlice';
import { useGeolocation } from '../hooks';
import * as Routes from '../routes';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [preferences, setPreferencies] = useState([]);

  useGeolocation(
    (pos) =>
      dispatch(
        storeUserPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      ),
    (error) => dispatch(storeInformationFail(error)),
  );

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
          <Button
            onPress={() => navigation.navigate(Routes.SINGLE_EVENT)}
            title="vai a single event"
          />
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
