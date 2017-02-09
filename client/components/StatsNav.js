import React, { Component } from 'react';
import StatSpinner from './StatSpinner.js'
import {View, TextInput, Text} from 'react-native';
import Button from 'react-native-button';

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
      <View >
        <Text style={{textAlign:'center', fontSize:30, color:'white', textShadowColor:'black', textShadowRadius:2, backgroundColor:'black'}}>{this.props.location}</Text>
        {this.props.bodyView === 'user' ? (
          <View style={{flexDirection:'row', flexWrap:'wrap', borderColor:'black', borderWidth: 1, backgroundColor:'black'}}>
            <Text style={{height: 30, fontSize:20, top: 5, color:'white', left: 5}}>@</Text>
            <TextInput
                style={{width: 340, height: 45, fontSize: 15, textAlignVertical: 'top', color:'white', left: 5}}
                placeholder=" Enter a Twitter Handle!"
                onChangeText={this.props.formChange}
                value = {this.props.formVal}
              />
              <Button style={{fontSize: 22, color: 'green', top: 5, left: 5, width: 40}}
                onPress={this.handleClick.bind(this)}
                accessibilityLabel="Get User">🔍
              </Button>
          </View>) : (<View/>)}
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