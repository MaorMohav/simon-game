import React from 'react';
import { Link } from 'react-router-dom';



import "./StartGame.css";


class StartGame extends React.Component {

	render() {
		return (
                  <div className="start-screen-container">
                  <div className="start-screen">
                    <h1 className="game-title">Welcome To Simon Game</h1>
                    <p className="game-description">
                      This is a game where you try to remember the sequence of square buttons that the computer clicks on. The goal is to repeat the sequence correctly. 
                        </p>
                    <p className="game-description">
                     Enjoy!
                    </p>
                    <Link to="/playing">
                      <button className="play-button">Play</button>
                    </Link>
                  </div>
                </div>

            )
	}
}

export default StartGame;


