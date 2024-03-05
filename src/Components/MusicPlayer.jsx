import React, { Component } from 'react';
import '../css/music_player.css';


export default class MusicPlayer extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentTime: this.props.audio.currentTime
    }

    this.interval = null;
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      this.setState({
        currentTime: this.props.audio.currentTime
      });
      document.getElementsByClassName('seek-bar')[0].style.width = `${((this.props.audio.currentTime/this.props.audio.duration)*100)}%`;
    }, 100);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render() {

    const {song, audio} = this.props;
    const currentTime = Math.floor(this.props.audio.currentTime/60) + ':' + (Math.floor(this.props.audio.currentTime%60) < 10 ? '0' + Math.floor(this.props.audio.currentTime%60) : Math.floor(this.props.audio.currentTime%60));
    const songDuration = Math.floor(audio.duration/60) + ':' + (Math.floor(audio.duration%60) < 10 ? '0' + Math.floor(audio.duration%60) : Math.floor(audio.duration%60));
  
    return (
      <div className='screen-container' style={styles.screenContainer}>
        <div style={styles.songInfo}>
          <img src={song.poster} alt="" style={styles.songPoster} />
          <h3>{song.name}</h3>
        </div>
        
        <div className="seek" style={styles.seek}>
          <div className="duration-current" style={styles.durationCurrent}>
            {currentTime}
            </div>
          <div className="seek-bar" style={styles.seekBar}></div>
          <div className="song-duration" style={styles.songDuration}>
            {songDuration}
          </div>
        </div>
        
      </div>
    )
  }
}


const styles = {
  screenContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  songPoster: {
    marginTop: '20px',
    width: '130px',
    height: '130px',
    objectFit: 'contain'
  },
  seek: {
    marginTop: '20px',
      width: '200px',
      height: '7px',
      borderRadius: '7px',
      backgroundColor: 'grey',
      position: 'relative',
  },
  seekBar: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '0',
    height: '7px',
    backgroundColor: '#fff',
    borderRadius: '5px'
  },
  durationCurrent: {
    fontSize: '14px',
    position: 'absolute',
    top: '-7px',
    left: '-32px',
    color: '#fff'
  },
  songDuration: {
    fontSize: '14px',
    position: 'absolute',
    top: '-7px',
    right: '-32px',
    color: '#fff'
  }
}

