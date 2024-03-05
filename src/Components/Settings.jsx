import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
    return (
      <div className='screen-container' style={styles.screenContainer}>
        <img src="/assets/images/settings.png" alt="" />
      </div>
    )
  }
}


const styles = {
    screenContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
}