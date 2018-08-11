import React, { Component } from 'react'
import { Button, View, TouchableWithoutFeedback } from 'react-native';

export default class FormButton extends Component {
  render() {
    const { title, onPress, width, height, backgroundColor } = this.props;
    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 5,
          width: width,
          height: height
        }}
      >
        <TouchableWithoutFeedback>
          <Button
            color={'white'}
            title={title}
            onPress={onPress}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}