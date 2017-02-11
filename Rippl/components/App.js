/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Platform, AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
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
      bodyView:'user',
      location: 0
    }


    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeTrend = this.changeTrend.bind(this);
    this.goHome = this.goHome.bind(this);
    this.changeBody = this.changeBody.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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
    this.setState({bodyView:body}, () => {
      this.getData(this.state.location);
    });
  }
  // This function gets all the user data for user RipplMaster (default user),
  // stops the spinner animation, and if there is an error displays an error message.
  getData(location) {
    var that = this;
    var searchURL = (this.state.bodyView === 'user') ? 'rippl/' : 'getTrends/';
    //10.0.3.2
    //10.6.20.226
    //192.168.0.2
    fetch('http://10.6.20.226:8000/' + searchURL + location, {
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

    setInterval( () => {
      fetch('http://10.6.20.226:8000/trends', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(data => null);
    }, 900000);

  }

  // Handles changes in the input tag
  handleChange(text) {
    this.setState({query: text});
  }
  onMomentumScrollEnd (e, state, context) {
    this.setState({location: state.index});
    this.getData(state.index);
  }

  // This function gets tells the server to get the data for the a specified user,
  // starts the spinner animation, and if there is an error displays an error message.
  queryUser() {
    // this.setState({error: false});
    var that = this;
    var handle = this.state.query;

    this.setState({query: ''});
    fetch('http://10.6.20.226:8000/analyze/@' + handle, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => {this.getData(this.state.location)})
    .catch(err => {
      that.setState({error: true});
    });
  }

  deleteUser(handle) {
    var that = this;
    this.setState({query: ''});
    fetch('http://10.6.20.226:8000/delete/' + handle, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      that.getData(that.state.location);
    })
    .catch(err => {
      that.setState({error: true});
    });
  }

  render() {
    return (
      <View>
        <Image source={
          (this.state.location === 0) ? (require('../img/world.jpg')) :
          (this.state.location === 1) ? (require('../img/sf.jpg')) :
          (this.state.location === 2) ? (require('../img/toronto.jpg')) :
          (this.state.location === 3) ? (require('../img/nyc.jpg')) :
          (this.state.location === 4) ? (require('../img/chicago.jpg')) :
          (this.state.location === 5) ? (require('../img/austin.jpg')) :
          (this.state.location === 6) ? (require('../img/sydney.jpg')) :
          (this.state.location === 7) ? (require('../img/london.jpg')) :
          (this.state.location === 8) ? (require('../img/dubai.jpg')) :
          (require('../img/rio.jpg'))
        } style={styles.backgroundImage}/>
        <Text style={styles.title}>{location[this.state.location].name}</Text>
        {
          (this.state.pageView === 'home') ? (
          <View style={styles.background}>
            <Swiper height={(Platform.OS === 'ios') ? 575 :590} loop={true} onMomentumScrollEnd={this.onMomentumScrollEnd}>
              {location.map((loc) => {
                return (
                <View key={loc.id}>

                  <StatsNav bodyView={this.state.bodyView} location={loc.name} formVal={this.state.query} getUserClick={this.queryUser} formChange={this.handleChange}/>
                  <StatsBody bodyView={this.state.bodyView} changeBody={this.changeBody} changeUser={this.changeUser} changeTrend={this.changeTrend} list={this.state.list} deleteUser={this.deleteUser}/>
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
            <UserStat location={this.state.location} clickedUser={this.state.clickedUser} goHome={this.goHome}/>
          ) : (
            <TrendStat location={this.state.location} clickedTrend={this.state.clickedTrend} goHome={this.goHome}/>
          )
        }
      </View>


    );
  }
}

var location = [
  {id: 0, name: 'Worldwide', img:'world.jpg'},
  {id: 1, name: 'San Francisco', img:'sf.jpg'},
  {id: 2, name: 'Toronto', img:'toronto.jpg'},
  {id: 3, name: 'New York', img:'nyc.jpg'},
  {id: 4, name: 'Chicago', img:'chicago.jpg'},
  {id: 5, name: 'Austin', img:'austin.jpg'},
  {id: 6, name: 'Sydney', img:'sydney.jpg'},
  {id: 7, name: 'London', img:'london.jpg'},
  {id: 8, name: 'Dubai', img:'dubai.jpg'},
  {id: 9, name: 'Rio de Janiero', img:'rio.jpg'}
  ];
var styles = StyleSheet.create({
  title: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    textAlign:'center',
    fontSize:50,
    color:'white',
    backgroundColor:'rgba(0,0,0,0.7)'
  },
  container: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 12  : 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'row',
    resizeMode: 'stretch', // or 'stretch'
    zIndex: -1,
    height: 660,
    width: 420,
    // marginTop: 0,
    // marginBottom: 0,
    // marginLeft: 0,
    // marginRight: 0,
    position: 'absolute',
    left:     0,
    top:      0
  },
  background: {
    backgroundColor:'rgba(52,52,52,0)'
  }
})


export default App;


