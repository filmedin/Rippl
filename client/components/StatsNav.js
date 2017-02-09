import React, { Component } from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Button from 'react-native-button';

class StatsNav extends React.Component{
  constructor(props){
  	super(props);
  }
  render(){
  	return(
      <View>
        <Text style={styles.title}>{this.props.location}</Text>
        {this.props.bodyView === 'user' ? (
          <View style={styles.container}>
            <Text style={styles.preHandle}>@</Text>
            <TextInput style={styles.handle} onChangeText={this.props.formChange} value={this.props.formVal}/>
            <Button style={styles.handleSubmit} onPress={this.props.getUserClick}>🔍</Button>
          </View>) : (<View/>)}
      </View>
  	);
  }
}

export default StatsNav;
var styles = StyleSheet.create({
  title: {
    textAlign:'center', 
    fontSize:30, 
    color:'white', 
    textShadowColor:'black', 
    textShadowRadius:2, 
    backgroundColor:'black'
  },
  container: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    borderColor:'black', 
    borderWidth: 1, 
    backgroundColor:'black'
  },
  preHandle: {
    height: 30, 
    fontSize:20, 
    top: 5, 
    color:'white', 
    left: 5
  },
  handle: {
    width: 340, 
    height: 45, 
    fontSize: 15, 
    textAlignVertical: 'top', 
    color:'white', 
    left: 5
  },
  handleSubmit: {
    fontSize: 22, 
    color: 'green', 
    top: 5, 
    left: 5, 
    width: 40
  }
});
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