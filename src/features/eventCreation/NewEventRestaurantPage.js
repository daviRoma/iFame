import React, { useState } from 'react';
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

  const [search, setSearch] = useState('');
  const [restList, setRestList] = useState(restaurants);
  const onSearch = () => {
    if (search) {
      setRestList(
        restList.filter(
          (item) => item.name.toLowerCase() === search.toLowerCase(),
        ),
      );
    } else {
      setRestList(restaurants);
    }
  };
  return (
    <>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <>
          {!restList ? (
            <>
              {error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : (
                <ErrorMessage>No data found</ErrorMessage>
              )}
            </>
          ) : (
            <>
              <SearchBarItem
                term={search}
                setTerm={setSearch}
                onTermSubmit={onSearch}
              />
              <FlatList
                data={restList}
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
