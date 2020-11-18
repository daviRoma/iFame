import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  ErrorMessage,
  SearchBarItem,
} from '../../components';
import { useRestaurants } from '../../hooks';
import { selectState } from './eventCreationSlice';
import RestaurantCard from '../restaurants/RestaurantCard';
import * as Routes from '../../routes';

const NewEventRestaurantPage = ({ navigation }) => {
  const { category, location } = useSelector(selectState);
  const [search, setSearch] = useState('');
  const { loading, restaurants, error } = useRestaurants({
    location,
    categories: category,
  });
  const [restList, setRestList] = useState([]);

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

  useEffect(() => {
    setRestList(restaurants);
  }, [restaurants]);

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
              <SearchBarItem
                term={search}
                setTerm={setSearch}
                onTermSubmit={onSearch}
              />
              <FlatList
                data={restList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(Routes.RESTAURANT_DETAIL, {
                        id: item.id,
                      })
                    }>
                    <RestaurantCard item={item} />
                  </TouchableOpacity>
                )}
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
