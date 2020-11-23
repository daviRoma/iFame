import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Card, Overlay, Text } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomActivityIndicator,
  RestaurantDetailComponent,
  Spacer,
  UserItem,
} from '../../components';
import { useEventPartecipants, useSingleUser } from '../../hooks';

const EventDetail = ({ event }) => {
  const [partecipants, loading] = useEventPartecipants(event);
  const [user, userLoading] = useSingleUser(event.author);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRestaurantVisible, setModalRestaurantVisible] = useState(false);
  const [fullImageVisible, setFullImageVisible] = useState(false);
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeigth, setImageHeight] = useState('');
  const restaurant = event.restaurant;

  useEffect(() => {
    Image.getSize(restaurant.image_url, (width, heigth) => {
      setImageWidth(width);
      setImageHeight(heigth);
    });
  }, [restaurant.image_url]);

  if (loading || userLoading) {
    return <CustomActivityIndicator />;
  }
  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{ uri: restaurant.image_url }}
          onPress={() => setFullImageVisible(true)}
        />
        <Card.Divider />
        <Card.Title h3>{event.title}</Card.Title>
        <View style={styles.eventInfo}>
          <Feather name="clock" size={30} />
          <Spacer margin={10} />
          <Text style={styles.text}>
            {event.day}, {event.hour}
          </Text>
        </View>
        <View style={styles.eventInfo}>
          <Ionicons name="location" size={30} />
          <Spacer margin={10} />
          <Text style={styles.text}>{event.location.name_it}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Ionicons name="people" size={30} />
          <Spacer margin={10} />
          <Text>Numero partecipanti: {event.partecipants}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Ionicons name="people" size={30} />
          <Spacer margin={10} />
          <Text>Partecipanti correnti: </Text>
          <View>
            {partecipants && partecipants.length > 0 ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.link}>
                  {event.currentPartecipants.length}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text>Ancora nessun partecipante</Text>
            )}
          </View>
        </View>
        <Spacer margin={5} />
        <Card.Divider />
        <Text h4>Informazioni</Text>
        <Spacer margin={5} />
        {event.description ? (
          <>
            <Text>{event.description}</Text>
            <Spacer margin={5} />
          </>
        ) : null}
        <TouchableOpacity onPress={() => setModalRestaurantVisible(true)}>
          <Text style={styles.link}>Dettagli sul ristorante</Text>
        </TouchableOpacity>
        <Spacer margin={5} />
        <Card.Divider />
        {user ? (
          <>
            <Text h4>Evento creato da:</Text>
            <UserItem user={user} />
          </>
        ) : null}

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <FlatList
            data={partecipants}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => <UserItem user={item} />}
          />
        </Modal>
        <Overlay
          isVisible={modalRestaurantVisible}
          onBackdropPress={() => setModalRestaurantVisible(false)}>
          <RestaurantDetailComponent restaurant={restaurant} />
        </Overlay>
        <Overlay
          isVisible={fullImageVisible}
          onBackdropPress={() => setFullImageVisible(false)}
          animationType="slide">
          <Image
            source={{ uri: restaurant.image_url }}
            style={{ width: imageWidth * 0.5, height: imageHeigth * 0.5 }}
          />
        </Overlay>
      </Card>
    </ScrollView>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  participantsContainer: {},
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
  },
  link: {
    color: 'blue',
  },
});
