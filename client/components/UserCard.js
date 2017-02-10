import React, { Component } from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';
// import { Col, Card } from 'react-materialize';


// This is the component that represents the cards holding data on each user
class StatsCard extends React.Component{
  constructor(props){
  	super(props)
  }
  render(){
  	return (
      <TouchableHighlight onPress={() => {this.props.changeUser(this.props.user.twitterHandle)}}>
        <View style={[styles.statCard]}>
          <Text style={[styles.name]}>
            {this.props.user.twitterHandle}    
          </Text>
          <Text style={[styles.score]}>
            {this.props.user.sentimentScore ? Math.floor(this.props.user.sentimentScore * 1000) : 'Calculating...'}
          </Text>
        </View>
      </TouchableHighlight>
  	);
  }
}

export default StatsCard;


var styles = StyleSheet.create({
  statCard: {
    // borderColor: '#14716c',
    // borderWidth: 2,
    // borderRadius: 5,
    // borderColor: 'white',
    margin: 2,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  name:  {
    alignSelf: 'flex-start',
    color: '#54575C',
    fontSize: 22
  },
  score: {
    alignSelf: 'flex-end',
    color: '#54575C',
    fontSize: 22
  }
});