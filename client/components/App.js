/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Tabs from 'react-native-tabs';

import StatsNav from './StatsNav.js';
import StatsBody from './StatsBody.js';
import UserStat from './UserStat.js';
import TrendStat from './TrendStat.js';


class App extends Component {


//start copied text
  constructor(props){
    super(props);

    this.state = {
      query: '',
      list: [], 
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
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
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
  getData(location) {
    var that = this;
    //10.0.3.2
    fetch('http://10.6.20.226:8000/rippl/' + location, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json()).then(data => {
      that.setState({list: data, error: false});
    })
    .catch(err => {
      that.setState({error: true});
    });
  }


  // Gets the data on mounting
  componentWillMount(){
    this.getData(0);
  }

  // Handles changes in the input tag
  handleChange(text) {
    this.setState({query: text});
  }
  onMomentumScrollEnd (e, state, context) {
    this.getData(state.index);
    

  }

  // This function gets tells the server to get the data for the a specified user,
  // starts the spinner animation, and if there is an error displays an error message.
  queryUser() {
    this.setState({error: false});
    var that = this;
    var handle = this.state.query;

    this.setState({query: ''});
    fetch('http://10.6.20.226:8000/analyze/' + handle, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => {that.getData()})
    .catch(err => {
      that.setState({error: true});
    });
  }

  //end of copied text


  render() {
    return (
      <View>
        {
          (this.state.pageView === 'home') ? (
          <View>
            <Swiper height={650} loop={true} onMomentumScrollEnd={this.onMomentumScrollEnd}>
              {location.map((loc) => {
                return (
                <View key={loc.id}>
                  <StatsNav bodyView={this.state.bodyView} location={loc.name} formVal={this.state.query} getUserClick={this.queryUser} formChange={this.handleChange}/>
                  <StatsBody bodyView={this.state.bodyView} changeBody={this.changeBody} changeUser={this.changeUser} changeTrend={this.changeTrend} list={this.state.list}/>
                </View>
                )
              })}
            </Swiper>
            <View style={styles.container}>
              <Tabs selected={this.state.bodyView} style={{backgroundColor:'black', height: 30, marginTop: 30}}
                    selectedStyle={{fontWeight:'bold', fontSize:20}} onSelect={el=>this.changeBody(el.props.name)}>
                  <Text name="user" style={{color:'white'}}>User</Text>
                  <Text name="trend" style={{color:'white'}}>Trend</Text>
              </Tabs>
            </View>
          </View>
          ) : (this.state.pageView === 'user') ? (
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
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default App;