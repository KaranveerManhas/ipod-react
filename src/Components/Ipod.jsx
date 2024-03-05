import React, { Component } from 'react';
// import screen component
import Screen from './Screen';
// import Buttons component
import Buttons from './Buttons';
// import css file for ipod component
import '../css/ipod.css';
// import songs data 
import {songs} from './song_data';


export default class Ipod extends Component {

  // constructor method
  constructor(){
    super();

    this.state = {
      activeMenu: 0, // active menu lets us know which menu item is selected
      currentMenu: -1, // current menu is the menu that is currently active on the screen
      navigationStack: [], // The navigation stack helps to go back and forth between menus
      songsList: songs, // List of song objects
      songIndex: 0, // Index of the current song
      currentSong: songs[0], // Current song object
      currentAudio: new Audio(songs[0].src), // Current song's audio object
      isPlaying: false, // Is playing boolean keeps track if music is being played or not
      menuMap: { //This map is for reference only and to better understand the logic behind the menu navigation functionality 
        'Main Menu': -1,
        'Music Menu': 1,
        'Game Menu': 2,
        'Settings Menu': 3,
        'All Music': 4,
        'Artists': 5,
        'Albums': 6
      },
      menuLengthMap: { // This lets functions know how many items a particular menu has 
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

  // Function to go back to the previous menu
  changeMenuBackward = () => {
    // if the navigation stack is empty, don't do anything
    if(this.state.navigationStack.length === 0){
      return;
    }
    // Get previous meny from the navigation stack which will be the last item in the navigation stack
    let previousMenu = this.state.navigationStack[this.state.navigationStack.length-1];
    // Remove the last item from the navigation stack
    let newNavigationStack = [];

    this.state.navigationStack.forEach((menuID, index) => {
      if (index === this.state.navigationStack.length-1){
        return null;
      }else {
        newNavigationStack.push(menuID);
      }
    })

    //  Set the state with the new values
    this.setState({
      currentMenu: previousMenu,
      navigationStack: newNavigationStack,
      activeMenu: 0
    })
    
  }

  // Function to go forward to the next menu
  changeMenuForward = (fromMenu, toMenu) => {

    // If the current menu is 4 which is the Music player, call the togglePlayPause function 
    if (this.state.currentMenu === 4){
      this.togglePlayPause();
    }
    // If active menu is zero and ok button is pressed, do nothing
    if(toMenu === 0){
      return;
    }
    // If the current menu is any one of the following, do nothing since there are no more menu items to go forward
    if (fromMenu === 2 ||
        fromMenu === 3 ||
        fromMenu === 4 ||
        fromMenu === 5 ||
        fromMenu === 6
      ){
      return;
    }
    // Get navigation stack from this.state
    let navigationStack = this.state.navigationStack;
    // Push the current menu to the navigation stack
    navigationStack.push(fromMenu);
    // If the current menu is 1
    if ( fromMenu === 1){
      // and active menu is 1, set current menu to 4
      if(toMenu === 1){
        this.setState({
          currentMenu: 4,
          navigationStack: navigationStack,
          activeMenu: 0
        });
        // and active menu is 2, set current menu to 5
      }else if(toMenu === 2){
        this.setState({
          currentMenu: 5,
          navigationStack: navigationStack,
          activeMenu: 0
        });
        // and active menu is 3, set current menu to 6
      }else {
        this.setState({
          currentMenu: 6,
          navigationStack: navigationStack,
          activeMenu: 0
        });
      }

      //  If the current menu is not 1(which means it's -1), set currentMenu to toMenu passed to this function which will be either 1, 2, or 3
    }else{
      this.setState({
        currentMenu: toMenu,
        navigationStack: navigationStack,
        activeMenu: 0
      });
    }
  }

  // Method for playing and pausing a song
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

  // Go to previous song
  seekSongPrevious = (e) => {
    // check if new song index will be less than zero, if it is then set it to  the last song in songs array otherwise reduce song index by 1
    const newSongIndex = this.state.songIndex - 1 > -1 ? (this.state.songIndex - 1) : 3;
    // Set current song by the new song index in the songs list array
    const newCurrentSong = this.state.songsList[newSongIndex];
    // Get the new audio object for the song
    const newCurrentAudio = new Audio(this.state.songsList[newSongIndex].src);
    // Pause the current audio
    this.state.currentAudio.pause();
    // Set the state with the new values
    this.setState({
      songIndex: newSongIndex,
      currentSong: newCurrentSong,
      currentAudio: newCurrentAudio
    },
    // And play the new audio
    () => {
      this.state.currentAudio.play();
    }
    );
  }

  // Go to next song
  seekSongNext = (e) => {
    // check if new song index will be greater than 3, if it is then set it to 0 otherwise increase song index by 1
    const newSongIndex = this.state.songIndex + 1 < 4 ? (this.state.songIndex + 1) : 0;
    // Set the current song according to the new song index in the songs list array
    const newCurrentSong = this.state.songsList[newSongIndex];
    // Get the new audio object for the song
    const newCurrentAudio = new Audio(this.state.songsList[newSongIndex].src);
    // Pause the current audio
    this.state.currentAudio.pause();
    // Set the state with the new values
    this.setState({
      songIndex: newSongIndex,
      currentSong: newCurrentSong,
      currentAudio: newCurrentAudio
    }, 
    // And play the new audio
    () => {
      this.state.currentAudio.play();
    });
  }

  // Function to update active menu item while rotating  the wheel
  updateActiveMenu = (direction, menu) => {
    // The menus below have no further submenus so just return
    if (menu === 2 ||
      menu === 3 ||
      menu === 4 ||
      menu === 5 ||
      menu === 6
      ){
        return;
      }
      // Create min and max menu item values
      let min=1;
      // Max will be set according to the current menu's number of menu items, which is stored in menuLengthMap dictionary
      let max = this.state.menuLengthMap[menu];

      // If the direction is clockwise
      if (direction === 1){
        // If the activeMenu value is greater than or equal to maximum length of the current menu, set active menu to min which would be the first item in the menu
        if (this.state.activeMenu >= max){
          this.setState({
            activeMenu: min
          })
          // Else add 1 to activeMenu
        }else{
          this.setState({
            activeMenu: this.state.activeMenu + 1
          })
        }
        // if the direction is counterclockwise
      }else{
        // and activeMenu is less than or equal to min which is 1, set  activeMenu to max
        if (this.state.activeMenu <= min){
          this.setState({
            activeMenu: max
          })
          // otherwise subtract 1 from activeMenu
        }else{
          this.setState({
            activeMenu: this.state.activeMenu - 1
          })
        }
      }
  }

  // Render function
  render() {
    return (
      // Ipod container div which contains two components: the screen and the buttons
      <div className = "ipod-container">
        {/* Screen component */}
        <Screen song={this.state.currentSong} 
        activeMenu={this.state.activeMenu} 
        audio={this.state.currentAudio}
        menuMap={this.state.menuMap}
        currentMenu={this.state.currentMenu} />

        {/* Buttons component */}
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
