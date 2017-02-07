import React, { Component } from 'react';
import StatSpinner from './StatSpinner.js'
import {View, Text} from 'react-native';
// import { Col, Row, Card, CardPanel } from 'react-materialize';


// This is the component that represents the box that displays the data
class StatsCard extends React.Component{
  constructor(props){
  	super(props);
  }

  render(){
  	return (
      <View className="statsbox">
        <Text>
          Rippl Score: {this.props.score ? Math.floor(this.props.score * 1000) : 'Calculating...'}
        </Text>
      </View>
  	);
  }
}

export default StatsCard;

        // <Row>
        //   <Col s={3} m={3} l={3}>
        //     <p id="scoreColor" style={{color:this.props.color}}>Rippl Score: {this.props.score ? Math.floor(this.props.score * 1000) : 'Calculating...'}</p>
        //   </Col>
        // </Row>