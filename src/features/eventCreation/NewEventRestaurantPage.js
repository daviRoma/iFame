import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  ErrorMessage,
  SearchBarItem,
} from '../../components';
import { useRestaurants } from '../../hooks';
import { selectState } from './eventCreationSlice';
import RestaurantCard from '../restaurants/RestaurantCard';

const NewEventRestaurantPage = () => {
  const { category, location } = useSelector(selectState);
  const { loading, restaurants, error } = useRestaurants({
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
            <>
              {error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : (
                <ErrorMessage>No data found</ErrorMessage>
              )}
            </>
          ) : (
            <>
              <SearchBarItem />
              <FlatList
                data={restaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RestaurantCard item={item} />}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default NewEventRestaurantPage;

const styles = StyleSheet.create({});
