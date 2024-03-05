import React, { Component } from 'react'
import Screen from './Screen';
import Buttons from './Buttons';
import '../css/ipod.css';
import {songs} from './song_data';


export default class Ipod extends Component {

  constructor(){
    super();

    this.state = {
      activeMenu: 0,
      currentMenu: -1,
      navigationStack: [],
      songsList: songs,
      songIndex: 0,
      currentSong: songs[0],
      currentAudio: new Audio(songs[0].src),
      isPlaying: false,
      menuLengthMap: {
        '-1': 3,
          1: 3,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0
      }
    }
  }

  
  changeMenuBackward = () => {
    if(this.state.navigationStack.length === 0){
      return;
    }
    let previousMenu = this.state.navigationStack[this.state.navigationStack.length-1];
    let newNavigationStack = [];
    // eslint-array
    this.state.navigationStack.forEach((menuID, index) => {
      if (index === this.state.navigationStack.length-1){
        return null;
      }else {
        newNavigationStack.push(menuID);
      }
    })

    this.setState({
      currentMenu: previousMenu,
      navigationStack: newNavigationStack,
      activeMenu: 0
    })
    
  }

  changeMenuForward = (fromMenu, toMenu) => {

    if (this.state.currentMenu === 4){
      this.togglePlayPause();
    }

    if(toMenu === 0){
      return;
    }
    
    if (fromMenu === 2 ||
        fromMenu === 3 ||
        fromMenu === 4 ||
        fromMenu === 5 ||
        fromMenu === 6
      ){
      return;
    }
    let navigationStack = this.state.navigationStack;

    navigationStack.push(fromMenu);

    if ( fromMenu === 1){
      
      if(toMenu === 1){
        this.setState({
          currentMenu: 4,
          navigationStack: navigationStack,
          activeMenu: 0
        });
      }else if(toMenu === 2){
        this.setState({
          currentMenu: 5,
          navigationStack: navigationStack,
          activeMenu: 0
        });
      }else {
        this.setState({
          currentMenu: 6,
          navigationStack: navigationStack,
          activeMenu: 0
        });
      }


    }else{
      this.setState({
        currentMenu: toMenu,
        navigationStack: navigationStack,
        activeMenu: 0
      });
    }
  }

  togglePlayPause = () => {
    if(this.state.isPlaying){
      this.state.currentAudio.pause();
    } else{
      this.state.currentAudio.play();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  seekSongPrevious = (e) => {
    const newSongIndex = this.state.songIndex - 1 > -1 ? (this.state.songIndex - 1) : 3;
    const newCurrentSong = this.state.songsList[newSongIndex];
    const newCurrentAudio = new Audio(this.state.songsList[newSongIndex].src);
    this.state.currentAudio.pause();
    this.setState({
      songIndex: newSongIndex,
      currentSong: newCurrentSong,
      currentAudio: newCurrentAudio
    },
    () => {
      this.state.currentAudio.play();
    }
    );
  }

  seekSongNext = (e) => {
    console.log("Seek Next button clicked");
    const newSongIndex = this.state.songIndex + 1 < 4 ? (this.state.songIndex + 1) : 0;
    const newCurrentSong = this.state.songsList[newSongIndex];
    const newCurrentAudio = new Audio(this.state.songsList[newSongIndex].src);
    this.state.currentAudio.pause();

    this.setState({
      songIndex: newSongIndex,
      currentSong: newCurrentSong,
      currentAudio: newCurrentAudio
    }, () => {
      this.state.currentAudio.play();
    });
  }

  updateActiveMenu = (direction, menu) => {
    if (menu === 2 ||
      menu === 3 ||
      menu === 4 ||
      menu === 5 ||
      menu === 6
      ){
        return;
      }
      let min=1;
      let max = this.state.menuLengthMap[menu];

      if (direction === 1){
        if (this.state.activeMenu >= max){
          this.setState({
            activeMenu: min
          })
        }else{
          this.setState({
            activeMenu: this.state.activeMenu + 1
          })
        }
      }else{
        if (this.state.activeMenu <= min){
          this.setState({
            activeMenu: max
          })
        }else{
          this.setState({
            activeMenu: this.state.activeMenu - 1
          })
        }
      }
  }

  render() {
    return (
      <div className = "ipod-container">
        <Screen song={this.state.currentSong} 
        activeMenu={this.state.activeMenu} 
        audio={this.state.currentAudio}
        menuMap={this.state.menuMap}
        currentMenu={this.state.currentMenu} />

        <Buttons changeMenuBackward={this.changeMenuBackward}
        changeMenuForward={this.changeMenuForward}
        togglePlayPause={this.togglePlayPause} 
        seekSongPrevious={this.seekSongPrevious} 
        seekSongNext={this.seekSongNext} 
        updateActiveMenu={this.updateActiveMenu}
        activeMenu={this.state.activeMenu}
        currentMenu={this.state.currentMenu} />
      </div>
    )
  }
}
