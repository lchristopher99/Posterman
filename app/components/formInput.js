import React, { Component } from 'react';
import { TextInput, Platform } from 'react-native';

export default class FormInput extends Component {
  state = {
    color: '#bec5d1'
  }

  render() {
    const { color } = this.state;
    const { placeholder, getValue, type, secure, autoCap } = this.props
    return (
      <TextInput
        onFocus={() => this.setState({ color: 'white' })}
        onEndEditing={() => this.setState({ color: '#bec5d1' })}
        onChangeText={value => getValue(value, type)}
        returnKeyType='done'
        keyboardAppearance='dark'
        keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
        placeholder={placeholder}
        secureTextEntry={secure}
        autoCapitalize={autoCap}
        style={{
          marginTop: 10,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: color,
          height: 35,
          width: 200,
          fontSize: 17
        }}
      />
    )
  }
}