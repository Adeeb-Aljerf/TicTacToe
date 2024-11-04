import { useEffect, useState, useRef } from "react";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";
import "./TicTacToe.css";
import { createStars } from "../../Ui/CreateStars";
import { createBubbles } from "../../Ui/CreateBubbles";

function TikTakToe() {
  //*______________________________States_______________________________________*/
  //? num of squars and the img stored here
  const [option, setOption] = useState(["", "", "", "", "", "", "", "", ""]);

  //? an array of the X and O based on the user clicks
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

  //? player1= X , player2 = O
  const [playerTurn, setPlayerTurn] = useState(1);

  //? a copy of the option array to modify on it freerly
  const updateOption = [...option];
  //? a copy of the data array to modify on it freerly
  const updataData = [...data];

  //? if gameEmd = true : a player won
  const [gameEnd, setGameEnd] = useState(false);

  //? storing players name
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  //? storing the winning score for each player
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const [drawScore, setDrawScore] = useState(0);

  //? Create an array of refs for the buttons:
  const buttonRefs = useRef([]);

  //? create use ref for the model view popup window
  const popupRef = useRef(null);
  const overLayRef = useRef(null);
  const playersInfoRef = useRef(null);

  //*___________________________________________________________________________*/

  useEffect(function () {
    // const player1 = prompt("name of the first player :");
    // const player2 = prompt("name of the second player :");
    // setPlayer1(player1);
    // setPlayer2(player2);
    //? calling the moving starts function in the background
    createStars();

    //? calling the moving bubbles function in the background
    // createBubbles();
  }, []);

  //? without this effect a delay of winning result will happpen
  useEffect(
    function () {
      //? a function to know if a player win or not
      Winning(); //? creating the stars in the background
    },
    [option]
  );

  function winningButtons(a, b, c) {
    //? Highlight winning buttons using refs
    buttonRefs.current[a].classList.add("winning-button");
    buttonRefs.current[b].classList.add("winning-button");
    buttonRefs.current[c].classList.add("winning-button");
  }

  //?  function to handle the player clicks on the options box
  function handleClick(e, index) {
    //? if the option the player want to add X or O on it isn't empty (true) or a player won return
    if (gameEnd || updateOption[index]) return;

    if (playerTurn === 1) {
      //? make the option that the user clicked a cross
      //? (so here i have to use the copy array cause i can't modify directly from the option array)
      //? then update the option using the copy that i already updated..
      updateOption[index] = cross;
      setOption(updateOption);

      //? same thing for the data array ...
      updataData[index] = "X";
      setData(updataData);

      //? change the player turn
      setPlayerTurn(2);
    } else {
      //? explained
      updateOption[index] = circle;
      setOption(updateOption);
      updataData[index] = "O";
      setData(updataData);

      setPlayerTurn(1);
    }

    //? if i call the winning here it will take the previos data resault because of the (stale state)
    //? so the right way is an updater funciton which it cant be done here or  use a useEffect
    // Winning()
    //? this is a stale state :
    console.log(data);
  }

  const Winning = function () {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] === "X" && data[b] === "X" && data[c] === "X") {
        setGameEnd(true);
        TheWinningPlayer(1);

        // Highlight winning buttons
        winningButtons(a, b, c);

        //increase the score of the winning player
        setPlayer1Score((player1Score) => (player1Score = player1Score + 1));
        return true;
      } else if (data[a] === "O" && data[b] === "O" && data[c] === "O") {
        setGameEnd(true);
        TheWinningPlayer(2);

        // Highlight winning buttons
        winningButtons(a, b, c);

        //increase the score of the winning player
        setPlayer2Score((player2Score) => (player2Score = player2Score + 1));
        return true;
      }
    }

    if (!option.includes("")) {
      setGameEnd(true);
      TheWinningPlayer(0);
      setDrawScore((drawScore) => (drawScore = drawScore + 1));
    }
  };

  function handleReset() {
    setOption(["", "", "", "", "", "", "", "", ""]);
    setData(["", "", "", "", "", "", "", "", ""]);
    setPlayerTurn(1);
    setGameEnd(false);
    document.getElementById("player1").classList.remove("win");
    document.getElementById("player2").classList.remove("win");
    document.querySelector(".draw").classList.remove("win");

    //? Remove winning-button class from all buttons using refs
    buttonRefs.current.forEach((button) =>
      button.classList.remove("winning-button")
    );
  }

  function TheWinningPlayer(player) {
    if (player === 1) {
      document.getElementById("player1").classList.add("win");
    } else if (player === 2) {
      document.getElementById("player2").classList.add("win");
    } else {
      document.querySelector(".draw").classList.add("win");
    }
  }

  const openModal = function (e) {
    e.preventDefault();
    if (player1.trim() === "" || player2.trim() === "")
      return alert("Please enter player names");

    popupRef.current.classList.add("hidden");
    overLayRef.current.classList.add("hidden");
    playersInfoRef.current.classList.remove("hidden");
  };

  //*__________________________________JSX________________________________________*/

  return (
    <>
      {/* <div className="bubbles"></div> */}
      <div className="starry-background"></div>
      <div className="container">
        <ul ref={playersInfoRef} className="hidden">
          <li>
            <div className="flex" id="player1">
              <p className="name">{player1}</p>
              <p
                className={`score ${
                  !gameEnd && playerTurn === 1 ? "active-player" : ""
                }`}
              >
                {player1Score} Wins
              </p>{" "}
            </div>
          </li>

          <li>
            <div className="flex" id="player2">
              <p className="name">{player2}</p>

              <p
                className={`score ${
                  !gameEnd && playerTurn === 2 ? "active-player" : ""
                }`}
              >
                {player2Score} Wins
              </p>
            </div>
          </li>

          <li>
            <div className="flex draw ">
              <p className="name">⚖</p>
              <p className="score">{drawScore} Draws</p>
            </div>
          </li>
        </ul>
        <div className="board">
          {option.map((img, index) => (
            <button
              className="board-btn "
              key={index}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={(e) => handleClick(e, index)}
            >
              <img className="tictactoe-icon" src={img}></img>
            </button>
          ))}
        </div>
        <button className="Reset-btn" onClick={handleReset}>
          Reset
        </button>

        <div ref={popupRef} className="modal">
          <h2 className="modal__header">
            Tic Tac Toe Game
            <br />
            by <span className="highlight">Adeeb Aljerf</span>
          </h2>
          <form className="modal__form">
            <label>Player1 (X)</label>
            <input
              type="text"
              autoFocus
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <label>Player2 (O)</label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <button className="btn" onClick={(e) => openModal(e)}>
              Start
            </button>
          </form>
        </div>
        <div ref={overLayRef} className="overlay"></div>
      </div>
    </>
  );
}

export default TikTakToe;
