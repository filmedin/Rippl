import React, { Component } from 'react';
import StatsBox from './StatsBox.js'
import {View, Text, Linking, TouchableHighlight, StyleSheet} from 'react-native';
// import { Col, Card } from 'react-materialize';


// This is the component that represents the cards holding data on each user
class StatsCard extends React.Component{
  constructor(props){
  	super(props),
    this.getScoreColor = this.getScoreColor.bind(this)
  }

  getScoreColor(){
    let score = this.props.user.sentimentScore;
    console.log('this is the score ' +  score * 1000);
    if(score * 1000 >= 600){
      return '#8bc34a';
    } else if(score < 600 && score > 0) {
      return 'yellow';
    } else{
      return '#ef5350';
    }
  }

  componentDidMount(){
    this.getScoreColor()
  }

  render(){
  	return (
      <TouchableHighlight onPress={() => {this.props.changeUser(this.props.user.twitterHandle)}}>
        <View style={[styles.statCard]}>
          <Text style={[styles.name]}>
            {this.props.user.twitterHandle}    
          </Text>
          {this.props.selected === 'user' ? (
              <Text style={[styles.score]}>
                {this.props.user.sentimentScore ? Math.floor(this.props.user.sentimentScore * 1000) : 'Calculating...'}
              </Text>
          
            ) : (<View/>)}


        </View>
      </TouchableHighlight>

   //    <Col m={6} s={12}>
   //  		<Card className='blue-grey darken-1 white-text' textClassName='white-text' title={this.props.user.twitterHandle} actions={[<a href={'http://twitter.com/' + this.props.user.twitterHandle}>To Twitter</a>]}>
   //  			<StatsBox score={this.props.user.sentimentScore} retweet={this.props.user.retweetCount} color={this.getScoreColor()}/>
   //  		</Card>
			// </Col>
  	);
  }
}

export default StatsCard;

//onPress={() => {this.props.changeUser(this.props.user.twitterHandle)}}
//onPress={() => Linking.openURL('http://twitter.com/' + this.props.user.twitterHandle)}


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
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 18
  }
});