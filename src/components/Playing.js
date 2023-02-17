import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./Playing.css";

const Playing = () => {
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);
  const [lastElementComputerMoves, setLastElementComputerMoves] = useState(0);
  const [lastElementPlayerMoves, setLastElementPlayerMoves] = useState(0);
  const [computerMoves, setComputerMoves] = useState([]);
  const [playerMoves, setPlayerMoves] = useState([]);
  const [startClicked, setStartClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComputerPlaying, setIsComputerPlaying] = useState(false);
  const [playerContinue, setPlayerContinue] = useState(false);
  const [goodChoise, setGoodChoise] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);
  const [computerContinue, setComputerContinue] = useState(false);
  const [changeGlow, setChangeGlow] = useState(true);


  const saveRecord = async () => {
    try {
      const response = await fetch('/api/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          record: score
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };


////////////////////////////////////////////////////////////////////   Player Moves    /////////////////////////////////////////////////////////////////////////////////////
  const PlayerTurn = async (num) => {

    if(isPlaying){
    setLastElementComputerMoves(0);
    setLastElementPlayerMoves(num);
    await new Promise((resolve) => setTimeout(resolve, 200));

    setPlayerMoves([...playerMoves, num]);
    
    if (num !== computerMoves[playerMoves.length]) {
      console.log("player Lose");
      setScore(0);
      setPlayerMoves([]);
      setComputerMoves([]);
      setIsComputerPlaying(false);
      setGoodChoise(false);
      setIsFailed(true);
     
    } 
    else {
      if (playerMoves.length +1 === computerMoves.length) {

        console.log("player win");
        setScore(score + 1);
        setPlayerMoves([]);
            if (score + 1 > record) {
              setRecord(score + 1);
              saveRecord();
            }
          setGoodChoise(true);
          setIsPlaying(false);
          setIsComputerPlaying(true);
      }
      else{ setPlayerContinue(true);}
    }
  }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function handlePlayerMoves() {
     setLastElementComputerMoves(0);
    }
    if (isPlaying) {
      handlePlayerMoves();
    }
  }, [isPlaying]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function handlePlayerMoves() {
      setLastElementPlayerMoves(0);
    }
  
    if (playerContinue) {
      setPlayerContinue(false);
      handlePlayerMoves();
      
    }
  }, [playerContinue]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (startClicked) {
        setScore(0);
        setPlayerMoves([]);
        setComputerMoves([Math.floor(Math.random() * 4) + 1]);
        setLastElementComputerMoves(computerMoves[0]);
        setIsComputerPlaying(true);
        setIsPlaying(false);
        setIsFailed(false);
        setGoodChoise(false);
        setStartClicked(false);
        setComputerContinue(false);
        setCurrentMove(0);
    }
  }, [startClicked,computerMoves]);
//////////////////////////////////////////////////////////////// Computer Moves //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function handleComputerMoves() {
      setLastElementPlayerMoves(0);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlayerMoves([]);

      if (!goodChoise) {
          setLastElementComputerMoves(computerMoves[0]);
          await new Promise((resolve) => setTimeout(resolve, 1000));   
      }
      else if (goodChoise&& !isPlaying) {
            let a=  Math.floor(Math.random() * 4) + 1
            setComputerMoves([...computerMoves, a]);
            
            setCurrentMove(0);
            setComputerContinue(true);
      }
      if(!computerContinue){
        setIsPlaying(true);
      }
      setIsComputerPlaying(false);
    }
    if (isComputerPlaying&& !isPlaying) {
      setStartClicked(false);
      handleComputerMoves();
    }
  }, [isComputerPlaying,isPlaying ,computerContinue,computerMoves,goodChoise]);


  useEffect(() => {
    async function handleComputerMoves(num) {
      setChangeGlow(false);
      console.log("setLastElementComputerMoves   " +lastElementComputerMoves);
      setLastElementComputerMoves(num);
      await new Promise((resolve) => setTimeout(resolve, 1000));   
    }
    async function handleGlow() {
      await new Promise((resolve) => setTimeout(resolve, 1000));   
      setChangeGlow(true);
    }

    if(!changeGlow){
      handleGlow();
    }
    if (currentMove<computerMoves.length+1&&computerContinue&&changeGlow) {
      setCurrentMove(currentMove+1);
      handleComputerMoves(computerMoves[currentMove]);}
    else if (currentMove>=computerMoves.length+1&&computerContinue){
      setComputerContinue(false);
      setIsPlaying(true);
      setLastElementComputerMoves(0);
    }
  }, [computerContinue,computerMoves,currentMove,changeGlow,lastElementComputerMoves]);

///////////////////////////////////////////////////////////////////////   Return Block  ///////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="game-container">
      
      <div 
       className={`${
        isFailed ? "failed-container" : "notfailed-container" 
      }`}>
        You failed, try again... Press start
      </div>
      
      <div className="score-container">
        Score : {score}
      </div>
      <div className="record-container">
        Record : {record}
      </div>
      <div className="squares-container">
        <div
          className={`square green ${
            (isComputerPlaying && lastElementComputerMoves===1) || (computerContinue && lastElementComputerMoves=== 1) ||  (isPlaying && lastElementPlayerMoves===1) ? "glow" : ""
          }`}
          onClick={() => PlayerTurn(1)}
        ></div>
        <div
          className={`square yellow ${
            (isComputerPlaying && lastElementComputerMoves=== 2) || (computerContinue && lastElementComputerMoves=== 2) || (isPlaying && lastElementPlayerMoves===2) ? "glow" : ""
          }`}
          onClick={() => PlayerTurn(2)}
        ></div>
        <div
          className={`square blue ${
            (isComputerPlaying && lastElementComputerMoves=== 3) || (computerContinue && lastElementComputerMoves=== 3) || (isPlaying && lastElementPlayerMoves===3) ? "glow" : ""
          }`}
          onClick={() => PlayerTurn(3)}
        ></div>
        <div
          className={`square red ${
            (isComputerPlaying && lastElementComputerMoves=== 4) || (computerContinue && lastElementComputerMoves=== 4) || (isPlaying && lastElementPlayerMoves===4) ? "glow" : ""
          }`}
          onClick={() => PlayerTurn(4)}
        ></div>
      </div>
      <div className="start-button-container">
        <button className="start-button" onClick={() => setStartClicked(true)}>
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

