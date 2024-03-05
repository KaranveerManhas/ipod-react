import React, { Component } from 'react';
import ZingTouch from 'zingtouch';
import '../css/buttons.css';
import {MdSkipPrevious, MdSkipNext} from 'react-icons/md';
import { PiPlayPauseBold } from "react-icons/pi";

export default class Buttons extends Component {
  constructor(){
    super();

    this.angle = 0;
  }

  wheelControl = (e) => {
   
    const {updateActiveMenu, currentMenu} = this.props;
    
    if (e.detail.distanceFromOrigin === 0){
      this.angle = e.detail.angle;
    }

    if (Math.abs(this.angle - e.detail.angle) > 300){
      this.angle = Math.abs(e.detail.angle);

      if (e.detail.distanceFromLast < 0){
        return;
      }else if (e.detail.distanceFromLast < 0){
        updateActiveMenu(0, currentMenu);
        
      }else{
        updateActiveMenu(1, currentMenu);

      }
    }else if (Math.abs(this.angle - e.detail.angle) > 15){
      this.angle = Math.abs(e.detail.angle);
      if(e.detail.distanceFromLast === 0){
        return;        
      }
      else if (e.detail.distanceFromLast > 0){
        updateActiveMenu(1, currentMenu);
      }else{
        updateActiveMenu(0, currentMenu);
      }
    }
    


  }

  componentDidMount(){

    const {changeMenuBackward, togglePlayPause, seekSongPrevious, seekSongNext} = this.props;

    const wheel = document.getElementById('wheel');
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById('menu');
    const playPause = document.getElementById('play-pause');
    const previousBtn = document.getElementById('previous');
    const nextBtn = document.getElementById('next');

    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInputs: 1,
      tolerance: 1
    });

    activeRegion.bind(menuIcon, 'tap', function(e){
      changeMenuBackward();
    });

    activeRegion.bind(wheel, 'rotate', (e) => {
      this.wheelControl(e);
    });

    activeRegion.bind(playPause, 'tap', function(e){
      togglePlayPause();
    });

    activeRegion.bind(previousBtn, longTapGesture, function(e){
      seekSongPrevious(e);
    });
    
    activeRegion.bind(nextBtn, longTapGesture, function(e){
      seekSongNext(e);
    });

  }

  render() {

    const {changeMenuForward, activeMenu, currentMenu} = this.props;

    return (
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
        <div className='controls' id="ok-button" onClick={() => changeMenuForward(currentMenu, activeMenu)}></div>
      </div>
    )
  }
}
