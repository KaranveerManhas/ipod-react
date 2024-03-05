import React, { Component } from 'react';


export default class MusicMenu extends Component {
  render() {

    const {activeMenu} = this.props;
    
    return (
        <div className="screen-container" style={styles.screenContainer}>
            <div className="menu-heading">Music Menu</div>
            {activeMenu === 1 ? <div className="menu-item active">All Music</div> : <div className='menu-item'>All Music</div>}
            {activeMenu === 2 ? <div className="menu-item active">Artists</div> : <div className='menu-item'>Artists</div>}
            {activeMenu === 3 ? <div className="menu-item active">Albums</div> : <div className='menu-item'>Albums</div>}
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