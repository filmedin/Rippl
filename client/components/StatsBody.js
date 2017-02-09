import React, { Component } from 'react';
import UserCard from './UserCard.js';
import TrendsCard from './TrendsCard.js';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

// import { Navbar, NavItem } from 'react-materialize';

// This is the component that represents the part of the page where the user cards are loaded
class StatsBody extends React.Component {
  constructor(props){
  	super(props);
    this.state = {
      page:'user'
    }
  }
  render(){
  	return (
      <View>
        {this.props.bodyView === 'user' ? (
            <ScrollView bounces={true} style={[styles.scrollViewUser]}>
              {this.props.list.map((user, index) => <UserCard key={index} changeUser={this.props.changeUser} user={user}/>) }
            </ScrollView>
          ) : (
            <ScrollView style={[styles.scrollViewTrend]}>
              {this.props.list.map((user, index) => <TrendsCard key={index} changeTrend={this.props.changeTrend} user={user}/>) }
            </ScrollView>
          )
        }
      </View>
  	);
  }
}

var styles = StyleSheet.create({
  scrollViewUser: {
    height: 520,
  }, 
  scrollViewTrend: {
    height: 565,
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
export default StatsBody;