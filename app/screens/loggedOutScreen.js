import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SecureStore } from 'expo';

// custom components
import FormInput from '../components/formInput';
import FormButton from '../components/button'

// middleware
import { loginUser, getData } from '../activities/dataWare';

export default class LoggedOutScreen extends Component {
  state = {
    user: null,
    pass: null
  }

  componentWillMount() {
    // create splash screen here
    let nav = this.props.navigation.navigate;
    SecureStore.getItemAsync('UID')
      .then(UID => {
        if (UID) {
          console.log(UID);
          nav('LoggedIn');
        }
      })
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
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Login
        </Text>
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
            backgroundColor={'green'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20
  },
  formButton: {
    paddingTop: 10
  }
});

// create a create user page
// let { user, pass } = this.state;
// postData(user, pass)
//   .then((res) => {
//     if (res.ok) {
//       console.log('Success!');
//     } else {
//       console.log('Something Broke!');
//     }
//   })