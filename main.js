$(document).ready(function() {
  const PLAYER_ONE = "X";
  const PLAYER_TWO = "O";

  let currentTurn = 1;
  let movesMade = 0;

  let quad = $(".q");
  let winnerContainer = $(".winner");
  let reset = $(".reset");

  quad.on("click", function(e) {
    movesMade++;
    if (currentTurn === 1) {
      e.target.innerHTML = PLAYER_ONE;
      e.target.style.color = "red";
      currentTurn++;
    } else {
      e.target.innerHTML = PLAYER_TWO;
      e.target.style.color = "blue";
      currentTurn--;
    }

    if (checkForWinner()) {
      let theWinner = currentTurn === 1 ? PLAYER_TWO : PLAYER_ONE;
      declareWinner(theWinner);
    }
  });

  reset.on("click", function(e) {
    let moves = Array.prototype.slice.call(quad);
    moves.map(m => {
      m.innerHTML = "";
    });
    currentTurn = 1;
    movesMade = 0;
    winnerContainer.css("display", "none");
  });

  function checkForWinner() {
    let moves = Array.prototype.slice.call(quad);
    let results = moves.map(function(q) {
      return q.innerHTML;
    });

    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombos.find(function(combo) {
      if (
        results[combo[0]] !== "" &&
        results[combo[1]] !== "" &&
        results[combo[2]] !== "" &&
        results[combo[0]] === results[combo[1]] &&
        results[combo[1]] === results[combo[2]]
      )
        return true;
      else return false;
    });
  }

  function declareWinner(winner) {
    winnerContainer.css("display", "block");
    winner = winner === PLAYER_ONE ? "Player1" : "Player2";
    winnerContainer.html(winner + " Wins!");
  }
});
