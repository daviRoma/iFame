import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  DateTimeSelector,
  Spacer,
  Tag,
} from '../../components';
import { useCities, useFoodCategories } from '../../hooks';
import * as Routes from '../../routes';
import { addInformations, selectState } from './eventCreationSlice';
import moment from 'moment';
import { dateFormat, timeFormat } from '../../utils';
import emoji from 'emoji-dictionary';

export default function NewEventFirstPage({ navigation }) {
  const state = useSelector(selectState);
  const { loading, foodCategories } = useFoodCategories();
  const { cities, citiesLoading } = useCities();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(state.title);
  const [location, setLocation] = useState(state.location);
  const [category, setCategory] = useState(state.category);
  const [numPart, setNumPart] = useState(state.partecipants);
  const [description, setDescription] = useState(state.description);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (state.day && state.hour) {
      const newDate = moment(state.day + ' ' + state.hour, 'DD-MM-YYYY hh:mm');
      setDate(newDate.toDate());
    }
  }, [state.day, state.hour]);

  const onSubmit = () => {
    dispatch(
      addInformations({
        title,
        day: dateFormat(date),
        hour: timeFormat(date),
        location,
        category,
        partecipants: numPart,
        description,
      }),
    );
    navigation.navigate(Routes.NEW_EVENT_SECOND);
  };

  return (
    <>
      {loading || !foodCategories || !cities || citiesLoading ? (
        <CustomActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.inputSection}>
              <Input
                label="Titolo"
                placeholder="Nuovo evento"
                value={title}
                onChangeText={setTitle}
              />
              <Input
                label="Descrizione (opzionale)"
                multiline={true}
                numberOfLines={2}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.rowContainer}>
              <Input
                label="Numero di partecipanti"
                keyboardType="numeric"
                value={numPart}
                onChangeText={setNumPart}
                containerStyle={styles.inputNumber}
                placeholder="0"
              />
              <DateTimeSelector
                buttonTitle="Seleziona una data"
                mode="datetime"
                onChange={(selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
                value={date}
              />
            </View>
            <Text
              style={{
                margin: 10,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Cosa mangerete?
            </Text>
            <View style={styles.select}>
              {foodCategories.map((value) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategory(value.key);
                  }}>
                  <Tag
                    emoji={value.emoji_code}
                    key={value.key}
                    selected={category === value.key}>
                    {value.title_it}
                  </Tag>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <Text>Seleziona una città:</Text>
              <Picker
                selectedValue={location}
                onValueChange={(value) => {
                  setLocation(value);
                }}>
                <Picker.Item label="Città" value="" key="" color="grey" />
                {cities.map((value) => {
                  return (
                    <Picker.Item
                      label={value.name_it}
                      value={value.key}
                      key={value.key}
                    />
                  );
                })}
              </Picker>
            </View>
            <Spacer />
            <View>
              <Button
                title="Vai avanti"
                onPress={onSubmit}
                disabled={!(title && location && date && numPart && category)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    paddingTop: 20,
    alignItems: 'flex-start',
  },
  inputNumber: {
    width: 200,
  },
  select: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
