import React, { Component } from 'react';
import {View, Text, BackAndroid} from 'react-native';
// import { Col, Row, Card, CardPanel } from 'react-materialize';


// This is the component that represents the box that displays the data
class TrendStat extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount () {
    var that = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
     that.props.goHome();
     return true;
    });
  }
  render(){
    return (

      <View>
        <View>
          {this.props.clickedTrend}
        </View>
      </View>
    );
  }
}

export default TrendStat;
