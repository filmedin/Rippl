import React, { Component } from 'react';
import {Platform, ScrollView, View, Text, TouchableHighlight, BackAndroid, StyleSheet} from 'react-native';
// import { Col, Row, Card, CardPanel } from 'react-materialize';


// This is the component that represents the box that displays the data
class TrendStat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }
  componentDidMount () {
    var that = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
     that.props.goHome();
     return true;
    });
    fetch('http://10.6.20.226:8000/ripplTrend/loc/' + this.props.location + '/trend/' + this.props.clickedTrend, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      that.setState({data:data});
    })
    .catch(err => {
      that.setState({error: true});
    });
  }
  render(){
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.trend}>
            {this.props.clickedTrend ? decodeURIComponent(this.props.clickedTrend).replace(/"/g,'').replace(/\+/g,' ') : 'Calculating...'}
          </Text>
          <Text style={styles.trend}>
            {this.state.data ? Math.floor(this.state.data.sentiment * 1000) : 'Calculating ...'}
          </Text>
        </View>
        {this.state.data ? (
          <View><ScrollView style={[styles.scrollViewTrend]}>
            {this.state.data.globalTweets.map((tweet, index) => {return (<View key={tweet.id} style={styles.textView}><Text style={styles.text}>@{tweet.user.screen_name}: {tweet.text}</Text></View>)}) }
          </ScrollView>
          {(Platform.OS === 'ios') ? (<TouchableHighlight style={styles.homeView} onPress={this.props.goHome}><Text style={styles.home}>Home</Text></TouchableHighlight>) : (<View></View>)}</View>
          ) : (<Text>Loading...</Text>)}


      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)'
    // flexDirection:'column',
    // flexWrap:'wrap',
    // justifyContent: 'space-between'

  },
  trend: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  scrollViewTrend: {
    height: (Platform.OS === 'ios') ? 495 : 600
  },
  textView: {
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderWidth: (Platform.OS === 'ios') ? .5 : 0.25,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  home: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  homeView: {
    borderWidth: .5,
    padding: 10,
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    backgroundColor: 'rgba(0,0,0,1)'
  }
});

export default TrendStat;

