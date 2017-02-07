// import { Preloader, Col } from 'react-materialize';
import React, { Component } from 'react';
import {View} from 'react-native';
// This is the component that represents the spinner animation
class StatSpinner extends React.Component{
  constructor(props){
  	super(props);
  }

  render(){
  	return (
      // <div className='spinner'>
      //   <Preloader flashing size='small'/>
      // </div>
      <View/>
  	);
  }
}

export default StatSpinner;