/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './components/App.js';
import {AppRegistry} from 'react-native';

export default class Rippl extends Component {


//start copied text
  constructor(props){
    super(props);
  }

  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('Rippl', () => Rippl);
