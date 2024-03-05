import React, { Component } from 'react';
import '../css/ipod.css';

export default class MainMenu extends Component {

    
  render() {
    const {activeMenu} = this.props;
    return (
      <div className="screen-container" style={styles.screenContainer}>
        <div className="menu-heading">Main Menu</div>
        {activeMenu === 1 ? <div className="menu-item active">Music</div> : <div className='menu-item'>Music</div>}
        {activeMenu === 2 ? <div className="menu-item active">Game</div> : <div className='menu-item'>Game</div>}
        {activeMenu === 3 ? <div className="menu-item active">Settings</div> : <div className='menu-item'>Settings</div>}
      </div>
    )
  }
}

const styles = {
    screenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
    }
}