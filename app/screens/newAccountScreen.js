import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SecureStore } from 'expo';

// custom components
import FormInput from '../components/formInput';
import FormButton from '../components/button'

// middleware
import { postData, getData, loginUser } from '../activities/dataWare';

export default class NewAccountScreen extends Component {
  state = {
    first: null,
    last: null,
    user: null,
    pass: null,
    confPass: null
  }

  getValue = (value, type) => {
    if (type == 'first') {
      this.setState({ first: value });
    } else if (type == 'last') {
      this.setState({ last: value });
    } else if (type == 'user') {
      this.setState({ user: value });
    } else if (type == 'pass') {
      this.setState({ pass: value });
    } else if (type == 'confPass') {
      this.setState({ confPass: value });
    }
  }

  _handleSubmit = (nav) => {
    let { pass, confPass, user, first, last } = this.state
    if (user && pass && confPass && first && last) {
      if (pass == confPass) {
        postData(user, pass, first, last, '/creds.json')
          .then((res) => {
            if (res.ok) {
              console.log('Success!');
              let UID = {
                user,
                pass
              }
              SecureStore.setItemAsync('UID', JSON.stringify(UID));
              nav('LoggedIn');
            } else {
              alert('Something Broked!');
            }
          })
      } else {
        alert('Passwords must match.');
      }
    } else {
      alert('All fields are required.')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/newAccount.jpg')}
        />
        <FormInput
          placeholder={'First Name'}
          type={'first'}
          getValue={this.getValue}
        />
        <FormInput
          placeholder={'Last Name'}
          type={'last'}
          getValue={this.getValue}
        />
        <FormInput
          placeholder={'Create Username'}
          type={'user'}
          getValue={this.getValue}
        />
        <FormInput
          placeholder={'Create Password'}
          type={'pass'}
          getValue={this.getValue}
          secure={true}
          autoCap={'none'}
        />
        <FormInput
          placeholder={'Confirm Password'}
          type={'confPass'}
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
          onPress={() => this.props.navigation.navigate('LoggedOut', { splash: false })}
          style={styles.text}
        >
          Go Back...
        </Text>
      </View>
    )
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