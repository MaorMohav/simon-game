import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Playing.css";


const Playing = () => {
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);
  const [computerMoves, setComputerMoves] = useState([]);
  const [playerMoves, setPlayerMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);



  const handleClick = (index) => {
    setPlayerMoves([...playerMoves, index]);
    if (index !== computerMoves[currentMove]) {
      setScore(0);
      setPlayerMoves([]);
      setComputerMoves([]);
      setCurrentMove(0);
      setIsPlaying(false);
    } 
    else {
      setCurrentMove(currentMove + 1);


    

      if (currentMove + 1 === computerMoves.length) {
        setScore(score + 1);
        setPlayerMoves([]);
        setCurrentMove(0);
        if (score + 1 > record) {
          setRecord(score + 1);
        }

        setComputerMoves([...computerMoves, Math.floor(Math.random() * 4) + 1]);
        
      }
    }
  };


  const startGame = () => {
    setScore(0);
    setPlayerMoves([]);
    setComputerMoves([]);
    setCurrentMove(0);
    setComputerMoves([Math.floor(Math.random() * 4) + 1]);
    setIsPlaying(true);
  };


  return (
    <div className="game-container">
      <div className="score-container">
        Score: {score}
      </div>
      <div className="record-container">
        Record: {record}
      </div>
      <div className="squares-container">
        <div
          className={`square green ${
            isPlaying && computerMoves[currentMove]===1 ? "glow" : ""
          }`}
          onClick={() => handleClick(1)}
        ></div>
        <div
          className={`square yellow ${
            isPlaying && computerMoves[currentMove]===2 ? "glow" : ""
          }`}
          onClick={() => handleClick(2)}
        ></div>
        <div
          className={`square blue ${
            isPlaying && computerMoves[currentMove]===3 ? "glow" : ""
          }`}
          onClick={() => handleClick(3)}
        ></div>
        <div
          className={`square red ${
            isPlaying && computerMoves[currentMove]===4 ? "glow" : ""
          }`}
          onClick={() => handleClick(4)}
        ></div>
      </div>
      <div className="start-button-container">
        <button className="start-button" onClick={startGame}>
          Start
        </button>
      </div>

      <div className="exit-container">
        <Link to="/">
          <button>Exit</button>
        </Link>
      </div>
    </div>
  );
};

export default Playing;  


