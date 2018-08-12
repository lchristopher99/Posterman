import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { SecureStore } from 'expo';

// custom components
import FormInput from '../components/formInput';
import FormButton from '../components/button'

// middleware
import { loginUser } from '../activities/dataWare';

export default class LoggedOutScreen extends Component {
  state = {
    user: null,
    pass: null,
    splash: true,
    fadeAnim: new Animated.Value(0)
  }

  componentWillMount() {
    let nav = this.props.navigation.navigate;
    let backNav = this.props.navigation.getParam('splash', true);
    if (!backNav) {
      this.setState({ splash: false });
    } else {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 1000
        }).start();

      setTimeout(() => {
        SecureStore.getItemAsync('UID')
          .then(UID => {
            if (UID) {
              console.log(UID);
              nav('LoggedIn');
            } else {
              this.setState({ splash: false });
            }
          })
      }, 2000)
    }
  }

  getValue = (value, type) => {
    if (type == 'user') {
      this.setState({ user: value });
    } else {
      this.setState({ pass: value });
    }
  }

  _handleSubmit = (nav) => {
    let { user, pass } = this.state
    loginUser(user, pass, '/creds.json')
      .then(auth => {
        if (auth) {
          console.log('IsAuth: ' + auth);
          nav('LoggedIn');
        } else {
          console.log('IsAuth: ' + auth);
        }
      })
  }

  render() {
    let { splash } = this.state;
    if (splash) {
      return (
        <View style={styles.container}>
          <Animated.View style={{ opacity: this.state.fadeAnim }}>
            <Image
              style={styles.logo}
              source={require('../images/logo.jpg')}
            />
          </Animated.View>
          <Image
            source={require('../images/posterman.jpg')}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={require('../images/login.jpg')}
          />
          <FormInput
            placeholder={'Username'}
            type={'user'}
            getValue={this.getValue}
          />
          <FormInput
            placeholder={'Password'}
            type={'pass'}
            getValue={this.getValue}
            secure={true}
            autoCap={'none'}
          />
          <View style={styles.formButton}>
            <FormButton
              title={'Submit'}
              onPress={() => this._handleSubmit(this.props.navigation.navigate)}
              width={200}
              backgroundColor={'#6db4ea'}
            />
          </View>
          <Text
            onPress={() => this.props.navigation.navigate('NewAccount')}
            style={styles.text}
          >
            Or Create An Account...
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '10%'
  },
  text: {
    top: 15,
    color: '#6db4ea'
  },
  formButton: {
    paddingTop: 10
  },
  logo: {
    bottom: 20
  }
});