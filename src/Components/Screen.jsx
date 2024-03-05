import React, { Component } from 'react';
import '../css/screen.css';
import MusicPlayer from './MusicPlayer';
import Game from './Game';
import Settings from './Settings';
import MusicMenu from './MusicMenu';
import MainMenu from './MainMenu';
import Artists from './Artists';
import Albums from './Albums';


export default class Screen extends Component {
  render() {
    const {activeMenu, currentMenu} = this.props;
    return (
        <>
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

