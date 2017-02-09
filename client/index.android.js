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
import Swiper from 'react-native-swiper';
import StatsNav from './components/StatsNav.js';
import StatsBody from './components/StatsBody.js';
import StatsFoot from './components/StatsFoot.js';
import StatSpinner from './components/StatSpinner.js';
import UserStat from './components/UserStat.js';
import TrendStat from './components/TrendStat.js';

export default class client extends Component {


//start copied text
  constructor(props){
    super(props);

    this.state = {
      query: '',
      list: [],
      spinner: false, 
      clickedUser: '',
      clickedTrend: '',
      pageView: 'home',
      bodyView:'user'
    }


    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeTrend = this.changeTrend.bind(this);
    this.goHome = this.goHome.bind(this);
    this.changeBody = this.changeBody.bind(this);
  }
  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     console.log(initialPosition);
    //     // this.setState({initialPosition});
    //   },
    //   (error) => alert(JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   // this.setState({lastPosition});
    // });
  }
  goHome() {
    this.setState({pageView:'home'});
  }
  changeUser(user) {
    this.setState({clickedUser:user, pageView:'user'});
  }
  changeTrend(trend) {
    this.setState({clickedTrend:trend, pageView:'trend'});
  }
  changeBody(body) {
    this.setState({bodyView:body})
  }
  // This function gets all the user data for user RipplMaster (default user),
  // stops the spinner animation, and if there is an error displays an error message.
  getData() {
    console.log('getting DATA');
    var that = this;
    //10.0.3.2
    fetch('http://10.6.20.226:8000/rippl/user/RipplMaster', {
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
    
    fetch('http://10.6.20.226:8000/analyze/' + query.handle, {
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
      {
        (this.state.pageView === 'home') ? (
        <Swiper style={styles.wrapper} loop={true}>
          {location.map((loc) => {
            return (
            <View key={loc.id}>
              <StatsNav bodyView={this.state.bodyView} location={loc.name} error={this.state.error} spinner={this.state.spinner} formVal={this.state.query} getUserClick={this.queryUser} formChange={this.handleChange}/>
              <StatsBody bodyView={this.state.bodyView} changeBody={this.changeBody} changeUser={this.changeUser} changeTrend={this.changeTrend} list={this.state.list}/>
            </View>
            )
          })}
        </Swiper>
        ) : (this.state.pageView === 'home') ? (
          <UserStat clickedUser={this.state.clickedUser} goHome={this.goHome}/>
        ) : (
          <TrendStat clickedTrend={this.state.clickedTrend} goHome={this.goHome}/>
        )
      }

      </View>
    );
  }
}
var location = [{id: 0, name: 'Worldwide'},{id: 1, name: 'San Francisco'},{id: 2, name: 'Toronto'},{id: 3, name: 'New York'},{id: 4, name: 'Chicago'},{id: 5, name: 'Austin'}];
var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

AppRegistry.registerComponent('client', () => client);
