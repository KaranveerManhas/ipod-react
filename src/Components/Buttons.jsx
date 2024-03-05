import React, { Component } from 'react';
// import Zingtouch
import ZingTouch from 'zingtouch';
// import styles for buttons
import '../css/buttons.css';
// import react icons
import {MdSkipPrevious, MdSkipNext} from 'react-icons/md';
import { PiPlayPauseBold } from "react-icons/pi";

// Button component starts
export default class Buttons extends Component {
  // constructor method
  constructor(){
    super();

    this.angle = 0;
  }

  // Function to update this.angle and call updateActiveMenu function which updates the menu item that is currently selected/active
  wheelControl = (e) => {
  //  Get updateActiveMenu and currentMenu from this.props
    const {updateActiveMenu, currentMenu} = this.props;
    
    // Set initial angle
    if (e.detail.distanceFromOrigin === 0){
      this.angle = e.detail.angle;
    }

    // If the difference between the current angle and the new angle is greater than 300
    if (Math.abs(this.angle - e.detail.angle) > 300){
      // Set current angle to new angle
      this.angle = Math.abs(e.detail.angle);
      // If distance from last is zero, return
      if (e.detail.distanceFromLast === 0){
        return;
        // if it is greater than 0 then call updateActiveMenu passing direction as 1(indicating clockwise rotation)
      }else if (e.detail.distanceFromLast > 0){
        updateActiveMenu(1, currentMenu);
        
        // else call updateActiveMenu passing direction as 0(indicating counterclockwise rotation)
      }else{
        updateActiveMenu(0, currentMenu);

      }
      // If difference between current angle and new angle is greater than 15
    }else if (Math.abs(this.angle - e.detail.angle) > 15){
      // Set current angle to new angle
      this.angle = Math.abs(e.detail.angle);
      // If distance from last is zero, return
      if(e.detail.distanceFromLast === 0){
        return;        
      }
      // if it is greater than 0 then call updateActiveMenu passing direction as 1(indicating clockwise rotation)
      else if (e.detail.distanceFromLast > 0){
        updateActiveMenu(1, currentMenu);
        
        // else call updateActiveMenu passing direction as 0(indicating counterclockwise rotation)
      }else{
        updateActiveMenu(0, currentMenu);
      }
    }
    


  }

  // ComponentDidMount method which is called when the component is mounted
  componentDidMount(){
    // Get props
    const {changeMenuBackward, togglePlayPause, seekSongPrevious, seekSongNext} = this.props;

    // Get wheel element
    const wheel = document.getElementById('wheel');
    // Set active region using Zingtouch library function
    const activeRegion = ZingTouch.Region(wheel);
    // Get menu icon element
    const menuIcon = document.getElementById('menu');
    // Get playPause element
    const playPause = document.getElementById('play-pause');
    // Get previous button element
    const previousBtn = document.getElementById('previous');
    // Get next button element
    const nextBtn = document.getElementById('next');

    // Create a long tap gesture config
    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInputs: 1,
      tolerance: 1
    });

    //  Add event listener for single tap on menu icon
    activeRegion.bind(menuIcon, 'tap', function(e){
      changeMenuBackward();
    });
    // Add event listener for rotation on the wheel
    activeRegion.bind(wheel, 'rotate', (e) => {
      this.wheelControl(e);
    });

    // Add event listener for playPause button 
    activeRegion.bind(playPause, 'tap', function(e){
      togglePlayPause();
    });
    // Add event listener to previous button
    activeRegion.bind(previousBtn, longTapGesture, function(e){
      seekSongPrevious(e);
    });
    
    // Add event listener to next button
    activeRegion.bind(nextBtn, longTapGesture, function(e){
      seekSongNext(e);
    });

  }

  // render function
  render() {
    // Get props
    const {changeMenuForward, activeMenu, currentMenu} = this.props;

    return (
      // Buttons container
      <div className='buttons-container'  id="wheel">
        <div className='controls' id="menu">
          <div>MENU</div>
        </div>
        <div className='controls' id="previous">
          <MdSkipPrevious />
        </div>
        <div className='controls' id="play-pause">
          <PiPlayPauseBold />
        </div>
        <div className='controls' id="next">
          <MdSkipNext />
        </div>
        {/* This is the ok button in the middle of the wheel. When clicked it will call the changeMenuForward function and pass the currentMenu and the activeMenu derived from props to it. */}
        <div className='controls' id="ok-button" onClick={() => changeMenuForward(currentMenu, activeMenu)}></div>
      </div>
    )
  }
}
