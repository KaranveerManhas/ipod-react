import React, { Component } from 'react';
// import css file for ipod component which contains some common styles for this component
import '../css/ipod.css';

// Main menu component
export default class MainMenu extends Component {

  // Render Main Menu
  render() {
    // Get activeMenu from props
    const {activeMenu} = this.props;
    return (
      // Screen container div 
      <div className="screen-container" style={styles.screenContainer}>
        {/* Menu heading */}
        <div className="menu-heading">Main Menu</div>
        {/* According to the activeMenu prop, the 'active' class will be added to the following menu items */}
        {activeMenu === 1 ? <div className="menu-item active">Music</div> : <div className='menu-item'>Music</div>}
        {activeMenu === 2 ? <div className="menu-item active">Game</div> : <div className='menu-item'>Game</div>}
        {activeMenu === 3 ? <div className="menu-item active">Settings</div> : <div className='menu-item'>Settings</div>}
      </div>
    )
  }
}

// Styles object for screen container
const styles = {
    screenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
    }
}