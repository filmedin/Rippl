import React, { Component } from 'react';
import StatsCard from './StatsCard.js';
import TrendsCard from './TrendsCard.js';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import Tabs from 'react-native-tabs';
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
            <ScrollView style={[styles.scrollViewUser]}>
              {this.props.list.map((user, index) => <StatsCard key={index} changeUser={this.props.changeUser} user={user}/>) }
            </ScrollView>
          ) : (
            <ScrollView style={[styles.scrollViewTrend]}>
              {this.props.list.map((user, index) => <TrendsCard key={index} changeTrend={this.props.changeTrend} user={user}/>) }
            </ScrollView>
          )
        }

        <Tabs selected={this.props.bodyView} style={{backgroundColor:'black', height: 30, bottom: 0}}
              selectedStyle={{fontWeight:'bold', fontSize:20}} onSelect={el=>this.props.changeBody(el.props.name)}>
            <Text name="user" style={{color:'white'}}>User</Text>
            <Text name="trend" style={{color:'white'}}>Trend</Text>
        </Tabs>
      </View>
  	);
  }
}

var styles = StyleSheet.create({
  scrollViewUser: {
    height: 550,
  }, 
  scrollViewTrend: {
    height: 600,
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
export default StatsBody;