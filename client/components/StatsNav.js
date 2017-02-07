import React, { Component } from 'react';
import StatSpinner from './StatSpinner.js'
import {View, TextInput, Button} from 'react-native';

// import { Navbar, NavItem, Row, Input, Icon, Button } from 'react-materialize';

// This is the component that represents the navbar



class StatsNav extends React.Component{
  constructor(props){
  	super(props);

  }

  // Handles click on Get User Button
  handleClick() {
    this.props.getUserClick();
    console.log('handleclick');
  }

  render(){
  	return(
      <View>
        <TextInput
            style={{height: 40, left: 20, top: 20}}
            placeholder="Enter a Twitter Handle!"
            onChangeText={this.props.formChange}
            value = {this.props.formVal}
          />


          <Button
            onPress={this.handleClick.bind(this)}
            title="Get User"
            accessibilityLabel="Get User"
          />
      </View>
  	);
  }
}

export default StatsNav;

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