import React, { Component } from 'react';

// Music Menu component
export default class MusicMenu extends Component {

  // Render function
  render() {
    // Get props
    const {activeMenu} = this.props;
    
    return (
      // Screen container
        <div className="screen-container" style={styles.screenContainer}>
            <div className="menu-heading">Music Menu</div>
            {/* Based on the activeMenu derived from props, add the active class to the menu items to highlight them */}
            {activeMenu === 1 ? <div className="menu-item active">All Music</div> : <div className='menu-item'>All Music</div>}
            {activeMenu === 2 ? <div className="menu-item active">Artists</div> : <div className='menu-item'>Artists</div>}
            {activeMenu === 3 ? <div className="menu-item active">Albums</div> : <div className='menu-item'>Albums</div>}
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