import React, { Component } from 'react';
import StatsBox from './StatsBox.js'
import {View, Text, Linking} from 'react-native';
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
    console.log(this.props.user.twitterHandle + ' has ' + this.props.user.retweetCount + ' retweets');
  	return (
      <View>
        <Text onPress={() => Linking.openURL('http://twitter.com/' + this.props.user.twitterHandle)}>
          {this.props.user.twitterHandle}    
        </Text>
        <StatsBox score={this.props.user.sentimentScore} retweet={this.props.user.retweetCount} color={this.getScoreColor()}/>

      </View>

   //    <Col m={6} s={12}>
   //  		<Card className='blue-grey darken-1 white-text' textClassName='white-text' title={this.props.user.twitterHandle} actions={[<a href={'http://twitter.com/' + this.props.user.twitterHandle}>To Twitter</a>]}>
   //  			<StatsBox score={this.props.user.sentimentScore} retweet={this.props.user.retweetCount} color={this.getScoreColor()}/>
   //  		</Card>
			// </Col>
  	);
  }
}

export default StatsCard;