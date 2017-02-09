import React, { Component } from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
// import { Col, Card } from 'react-materialize';


// This is the component that represents the cards holding data on each user
class StatsCard extends React.Component{
  constructor(props){
  	super(props)
  }
  shouldComponentUpdate() {
    return false;
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
    borderColor: '#14716c',
    borderWidth: 2,
    borderRadius: 2,
    margin: 2,
    padding: 4,
    backgroundColor: 'lightseagreen',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  name:  {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 18
  },
  score: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 18
  }
});