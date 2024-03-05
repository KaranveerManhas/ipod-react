import React, { Component } from 'react';
// import music player css file
import '../css/music_player.css';

// Music player component
export default class MusicPlayer extends Component {

  // Constructor method
  constructor(props){
    super(props);

    // current time is the time in seconds that the audio is currently playing at
    this.state = {
      currentTime: this.props.audio.currentTime
    }

    // This is to store the interval id which will be created below
    this.interval = null;
  }

  //  Method called when the component mounts
  componentDidMount(){
    // Create a new interval and assign  it to `this.interval` so we can clear it later 
    this.interval = setInterval(() => {
      //  Update the state with the current time of the audio
      this.setState({
        currentTime: this.props.audio.currentTime
      });
      // Also update the seek-bar element with the current time of the audio and adjust it's width accordingly
      document.getElementsByClassName('seek-bar')[0].style.width = `${((this.props.audio.currentTime/this.props.audio.duration)*100)}%`;
    }, 100);
  }

  // When the audio is complete the componentWillUnmount method is called, which will clear the interval which was previously stored in this.interval
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  // Render method
  render() {
    // Get props
    const {song, audio} = this.props;
    // Create current time string
    const currentTime = Math.floor(this.props.audio.currentTime/60) + ':' + (Math.floor(this.props.audio.currentTime%60) < 10 ? '0' + Math.floor(this.props.audio.currentTime%60) : Math.floor(this.props.audio.currentTime%60));
    // Create song duration string
    const songDuration = Math.floor(audio.duration/60) + ':' + (Math.floor(audio.duration%60) < 10 ? '0' + Math.floor(audio.duration%60) : Math.floor(audio.duration%60));
  
    return (
      // Screen container
      <div className='screen-container' style={styles.screenContainer}>
        {/* Song info container */}
        <div style={styles.songInfo}>
          <img src={song.poster} alt="" style={styles.songPoster} />
          <h3>{song.name}</h3>
        </div>
        {/* This is the seek  bar container */}
        <div className="seek" style={styles.seek}>
          {/* Current time div which updates every 100 milliseconds */}
          <div className="duration-current" style={styles.durationCurrent}>
            {currentTime}
            </div>
            {/* Seek bar which updates every 100 milliseconds as well */}
          <div className="seek-bar" style={styles.seekBar}></div>
          {/* Total duration of the song */}
          <div className="song-duration" style={styles.songDuration}>
            {songDuration}
          </div>
        </div>
        
      </div>
    )
  }
}

// Styles object for different components
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

