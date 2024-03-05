import React, { Component } from 'react';
// import css file for screen component
import '../css/screen.css';
// import music player component
import MusicPlayer from './MusicPlayer';
// import game component
import Game from './Game';
// import settings component
import Settings from './Settings';
// import music menu component
import MusicMenu from './MusicMenu';
// import main menu component
import MainMenu from './MainMenu';
// import artists component 
import Artists from './Artists';
// import albums component
import Albums from './Albums';

// Screen component
export default class Screen extends Component {
  render() {
    // Get props passed to Screen component
    const {activeMenu, currentMenu} = this.props;
    return (
        <>
        {/* Based on the current Menu in this.state of Ipod component any one of the below components will be rendered on the screen */}
        {currentMenu === -1 && <MainMenu activeMenu={activeMenu} />}
        {currentMenu === 1 && <MusicMenu activeMenu={activeMenu} />}
        {currentMenu === 2 && <Game />}
        {currentMenu === 3 && <Settings />}
        {currentMenu === 4 && <MusicPlayer song={this.props.song} audio={this.props.audio} />}
        {currentMenu === 5 && <Artists />}
        {currentMenu === 6 && <Albums />}
        </>
        
      
    )
  }
}

