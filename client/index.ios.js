/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import StatsNav from './components/StatsNav.js';
import StatsBody from './components/StatsBody.js';
import StatsFoot from './components/StatsFoot.js';
import StatSpinner from './components/StatSpinner.js'


export default class client extends Component {


//start copied text
  constructor(props){
    super(props);

    this.state = {
      query: '',
      list: [],
      spinner: false
    }


    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.queryUser = this.queryUser.bind(this);
  }


  // This function gets all the user data for user RipplMaster (default user),
  // stops the spinner animation, and if there is an error displays an error message.
  getData() {
    console.log('getting DATA');
    var that = this;
  
    fetch('http://localhost:3000/rippl/user/RipplMaster', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json()).then(data => {
      console.log('success getting rippl data!', data);
      // console.log('data.results,', );
      that.setState({list: data, spinner: false, error: false});
    })
    .catch(err => {
      that.setState({spinner: false, error: true});
      console.log('error', err);
    });


  }


  // Gets the data on mounting
  componentWillMount(){
    this.getData();
  }

  // Handles changes in the input tag
  handleChange(text) {
    this.setState({query: text});
  }


  // This function gets tells the server to get the data for the a specified user,
  // starts the spinner animation, and if there is an error displays an error message.
  queryUser() {
    this.setState({spinner: true, error: false});
    console.log('querying USER', this.state.query)
    var that = this;
    var query = { 
      handle: this.state.query
    };
    this.setState({query: ''});
    
    fetch('http://localhost:3000/analyze/' + query.handle, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => {that.getData()})
    .catch(err => {
      that.setState({spinner: false, error: true});
      console.log('query user error', err);
    });
  }

  //end of copied text


  render() {
    return (
      <View>
         <StatsNav error={this.state.error} spinner={this.state.spinner} formVal={this.state.query} getUserClick={this.queryUser} formChange={this.handleChange}/>
          <StatsBody list={this.state.list}/>
          <StatsFoot />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('client', () => client);
