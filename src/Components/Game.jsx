import React, { Component } from 'react';

export default class Game extends Component {
  render() {
    return (
      <div className="screen-container">
        <img style={styles.image} src="https://media2.giphy.com/media/uYe2emzPgDfj2/giphy.webp?cid=ecf05e47fa455dac230de80fff0206077175b008801bc689&rid=giphy.webp" alt="Game_Gif" />
      </div>
        
    )
  }
}

const styles = {
    image: {
      width: '100%',
      height: '100%'
    }
  }