import React, { Component } from 'react';
import {Platform, View, TextInput, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Button from 'react-native-button';

class StatsNav extends React.Component{
  constructor(props){
  	super(props);
  }
  render(){
  	return(
      <View>

        {this.props.bodyView === 'user' ? (
          <View style={styles.container}>
            <Text style={styles.preHandle}>@</Text>
            <TextInput style={styles.handle} onChangeText={this.props.formChange} value={this.props.formVal}/>
            <TouchableHighlight style={styles.searchView} onPress={this.props.getUserClick}>
              <Image style={styles.search} source={require('../img/search.png')}/>
            </TouchableHighlight>
          </View>) : (<View/>)}
      </View>
  	);
  }
}

export default StatsNav;
var styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'rgba(255,255,255,0)'
  },
  preHandle: {
    height: (Platform.OS === 'ios') ? 32 : 30,
    fontSize:(Platform.OS === 'ios') ? 30 : 20,
    top: 5,
    color:'#6D737B',
    left: 10
  },
  handle: {
    width: (Platform.OS === 'ios') ? 303 : 340,
    height: 45,
    fontSize: 22,
    textAlignVertical: 'top',
    color:'#6D737B',
    left: 10
  },
  handleSubmit: {
    fontSize: 22,
    top: 5,
    left: 5,
    width: 40
  },
  search:  {
    width: 35,
    height: 35
  },
  searchView:  {
    top: (Platform.OS === 'ios') ? 6 : 5,
    left: 10
  }
});

//            <Button style={styles.handleSubmit} onPress={this.props.getUserClick}>🔍</Button>
// <Navbar right>
     //    <NavItem href='/'>
     //      <img src="../img/rippl-sml.png" className="brand-logo right ripplnav"/>
     //    </NavItem>
     //      {this.props.spinner ? <NavItem><StatSpinner /></NavItem> : ''}
     //      {this.props.error ? <NavItem>Invalid Twitter Handle</NavItem> : ''}
     //    <NavItem>
     //      <Input onChange={this.props.formChange} label="New User" value={this.props.formVal}><Icon>account_circle</Icon></Input>
     //    </NavItem>
     //    <NavItem>
     //      <Button onClick={this.handleClick.bind(this)} waves='light'>Get User</Button>
     //    </NavItem>
     //  </Navbar>
             // <Text style={styles.title}>{this.props.location}</Text>