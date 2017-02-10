import React, { Component } from 'react';
import {View, Text, BackAndroid} from 'react-native';
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
      console.log(data);
      that.setState({data:data});
    })
    .catch(err => {
      that.setState({error: true});
    });
  }
  render(){
    return (

      <View>
        <Text>
          {decodeURIComponent(this.props.clickedTrend).replace(/"/g,'').replace(/\+/g,' ')} {this.state.data ? Math.floor(this.state.data.sentiment * 1000) : 'Calculating ...'}
        </Text>
      </View>
    );
  }
}

export default TrendStat;
