import React, { Component } from 'react';
import {View, Text, BackAndroid} from 'react-native';
// import { Col, Row, Card, CardPanel } from 'react-materialize';


// This is the component that represents the box that displays the data
class UserStat extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount () {
    var that = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
     // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
     // Typically you would use the navigator here to go to the last state.
     that.props.goHome();
     return true;
     // if (!this.onMainScreen()) {
       
     //   return true;
     // }
     // return false;
    });
  }
  render(){
    return (
      <View className="statsbox">
        <Text>
          {this.props.clickedUser}
        </Text>
      </View>
    );
  }
}

export default UserStat;
