import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Card, Overlay, Text } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../common/theme';
import {
  CustomActivityIndicator,
  RestaurantDetailComponent,
  Spacer,
  UserItem,
} from '../../components';
import { useEventPartecipants, useSingleUser } from '../../hooks';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Card.Image
            source={{ uri: restaurant.image_url }}
            onPress={() => setFullImageVisible(true)}
          />
          <Card.Divider />
          <Card.Title h3>{event.title}</Card.Title>
          <View style={styles.eventInfo}>
            <Feather name="clock" size={30} color={PRIMARY_COLOR} />
            <Spacer margin={10} />
            <Text style={styles.text}>
              {event.day}, {event.hour}
            </Text>
          </View>
          <View style={styles.eventInfo}>
            <Ionicons name="location" size={30} color={PRIMARY_COLOR} />
            <Spacer margin={10} />
            <Text style={styles.text}>{event.location.name_it}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Ionicons name="people" size={30} color={PRIMARY_COLOR} />
            <Spacer margin={10} />
            <Text>Numero partecipanti: {event.partecipants}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Ionicons name="people" size={30} color={PRIMARY_COLOR} />
            <Spacer margin={10} />
            <Text>Partecipanti correnti: </Text>
            <View>
              {partecipants && partecipants.length > 0 ? (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={styles.link}>
                    {event.currentParticipants.length} partecipanti
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
            <SafeAreaView style={styles.overlayContainer}>
              <Text style={styles.participantsText}>Participants</Text>
              <FlatList
                data={partecipants}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => <UserItem user={item} />}
              />
              {Platform.OS === 'ios' ? (
                <Button title="Close" onPress={() => setModalVisible(false)} />
              ) : null}
            </SafeAreaView>
          </Modal>
          <Overlay
            isVisible={modalRestaurantVisible}
            onBackdropPress={() => setModalRestaurantVisible(false)}>
            <SafeAreaView style={styles.overlayContainer}>
              <RestaurantDetailComponent restaurant={restaurant} />
              {Platform.OS === 'ios' ? (
                <Button title="Close" onPress={() => setModalRestaurantVisible(false)} />
              ) : null}
            </SafeAreaView>
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
    </SafeAreaView>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  overlayContainer: {
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    // paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    // height: windowHeight,
    // width: windowWidth,
    paddingHorizontal: 10,
  },
  participantsText: {
    color: SECONDARY_COLOR,
    fontSize: 18,
    fontWeight: "700",
    textAlign: 'center',
  },
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
