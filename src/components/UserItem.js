import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const UserItem = ({ user }) => {
  return (
    <ListItem bottomDivider>
      {user.avatar ? (
        <Avatar source={{ uri: user.avatar }} />
      ) : (
        <Avatar icon={{ name: 'user', type: 'font-awesome' }} />
      )}
      <ListItem.Content>
        <ListItem.Title>{user.email}</ListItem.Title>
        <ListItem.Subtitle>{user.username}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default UserItem;

const styles = StyleSheet.create({});
