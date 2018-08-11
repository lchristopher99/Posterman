import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class LoggedOutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Logged In!
        </Text>
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
