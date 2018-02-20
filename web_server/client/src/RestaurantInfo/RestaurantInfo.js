import './RestaurantInfo.css';
import React from 'react';

class RestaurantInfo extends React.Component{
  render(){
    return(
      <div>
        <h1> {this.props.Info.name}</h1>
      </div>
    );
  }
}

export default RestaurantInfo;