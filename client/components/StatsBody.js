import React, { Component } from 'react';
import StatsCard from './StatsCard.js';
import {View} from 'react-native';
// import { Navbar, NavItem } from 'react-materialize';

// This is the component that represents the part of the page where the user cards are loaded
class StatsBody extends React.Component{
  constructor(props){
  	super(props);
  }

  render(){
  	return (
      <View className="statsbody">
        {console.log('props list!', this.props.list)}
      	{this.props.list.map((user) => <StatsCard user={user}/>) }
      </View>

  	);
  }
}

export default StatsBody;