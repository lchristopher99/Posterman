import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SecureStore } from 'expo';

// custom components
import Button from '../components/button';


export default class LoggedOutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Logged In!
        </Text>
        <Button
          title='LogOut'
          backgroundColor='purple'
          onPress={() => {
            SecureStore.deleteItemAsync('UID');
            this.props.navigation.navigate('LoggedOut', { splash: false });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
