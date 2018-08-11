import React, { Component } from 'react';

// router
import { rootNav } from './router';

const Index = rootNav;
export default class App extends Component {
  render() {
    return <Index /> ;
  }
}