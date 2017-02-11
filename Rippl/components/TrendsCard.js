import React, { Component } from 'react';
import {View, Text, Linking, TouchableHighlight, StyleSheet} from 'react-native';



// This is the component that represents the cards holding data on each user
class TrendsCard extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <TouchableHighlight onPress={() => {this.props.changeTrend(this.props.trend.trend)}}>
        <View style={[styles.statCard]}>
          <Text style={[styles.name]}>
            {this.props.trend.trend ? decodeURIComponent(this.props.trend.trend).replace(/"/g,'').replace(/\+/g,' ') : 'Calculating...'}    
          </Text>
          <Text style={[styles.score]}>
            {this.props.trend.numTweets}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default TrendsCard;

//onPress={() => {this.props.changeUser(this.props.user.twitterHandle)}}
//onPress={() => Linking.openURL('http://twitter.com/' + this.props.user.twitterHandle)}


var styles = StyleSheet.create({
  statCard: {
    // borderColor: '#14716c',
    // borderWidth: 2,
    // borderRadius: 5,
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
    fontSize: 18
  },
  score: {
    alignSelf: 'flex-end',
    color: '#54575C',
    fontSize: 18
  }
});