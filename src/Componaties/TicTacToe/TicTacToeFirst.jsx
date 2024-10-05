import { useEffect, useState } from "react";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";
import "./TicTacToe.css";

function TikTakToe() {
  //*______________________________States_______________________________________*/
  //? num of squars and the img stored here
  const [option, setOption] = useState(["", "", "", "", "", "", "", "", ""]);

  //? an array of the X and O based on the user clicks
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

  //? player1= X , player2 = O
  const [player, setPlayer] = useState(1);

  //? a copy of the option array to modify on it freerly
  const updateOption = [...option];
  //? a copy of the data array to modify on it freerly
  const updataData = [...data];

  //? if gameEmd = true : a player won
  const [gameEnd, setGameEnd] = useState(false);

  //*___________________________________________________________________________*/

  //? without this effect a delay of winning result will happpen
  useEffect(
    function () {
      //? a function to know if a player win or not
      Winning();
    },
    [option]
  );

  //?  function to handle the player clicks on the options box
  function handleClick(e, index) {
    //? if the option the player want to add X or O on it isn't empty (true) or a player won return
    if (gameEnd || updateOption[index]) return;

    if (player === 1) {
      //? make the option that the user clicked a cross
      //?(so here i have to use the copy array cause i can't modify directly from the option array)
      //? then update the option using the copy that i already updated..
      updateOption[index] = cross;
      setOption(updateOption);

      //? same thing for the data array ...
      updataData[index] = "X";
      setData(updataData);

      //? change the player turn
      setPlayer(2);
    } else {
      //? explained
      updateOption[index] = circle;
      setOption(updateOption);
      updataData[index] = "O";
      setData(updataData);

      setPlayer(1);
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
        document.querySelector("h1").innerHTML = "Player X wins!";
        setGameEnd(true);
        return true;
      } else if (data[a] === "O" && data[b] === "O" && data[c] === "O") {
        document.querySelector("h1").innerHTML = "Player O wins!";
        setGameEnd(true);
        return true;
      }
    }
    if (!option.includes("")) {
      document.querySelector("h1").innerHTML = "Its a Draw!!";
      setGameEnd(true);
    }
  };

  function handleReset() {
    setOption(["", "", "", "", "", "", "", "", ""]);
    setData(["", "", "", "", "", "", "", "", ""]);
    setPlayer(1);
    setGameEnd(false);
  }
  //*__________________________________JSX________________________________________*/

  return (
    <div className="container">
      <h1>
        Tic Tac Toe Game in <span>React</span>
      </h1>

      <div className="board">
        {option.map((img, index) => (
          <button
            className="board-btn "
            key={index}
            onClick={(e) => handleClick(e, index)}
          >
            <img src={img}></img>
          </button>
        ))}
      </div>
      <button className="Reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
//*_____________________________________________________________________________*/

export default TikTakToe;
