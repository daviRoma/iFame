import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { CustomActivityIndicator } from '../../components';
import { useRestaurants } from '../../hooks';
import { selectState } from './eventCreationSlice';
import RestaurantCard from '../restaurants/RestaurantCard';

const NewEventRestaurantPage = () => {
  const { category, location } = useSelector(selectState);
  const { loading, restaurants } = useRestaurants({
    location,
    categories: category,
  });
  return (
    <>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <>
          {!restaurants ? (
            <Text>No data found</Text>
          ) : (
            <FlatList
              data={restaurants}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <RestaurantCard item={item} />}
            />
          )}
        </>
      )}
    </>
  );
};

export default NewEventRestaurantPage;

const styles = StyleSheet.create({});
