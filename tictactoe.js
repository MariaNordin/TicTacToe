
 var turns = 0;
 var symbol;
 var player = "X";
 var winner;
 var winnerArray;

 const winnerPatterns = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],

     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],

     [2, 4, 6],
     [0, 4, 8]
 ]

 document.getElementById("output").innerHTML = "Player: " + player;

 function draw(elementId) {  //guess this is the brain
    if (winner !== undefined) {   //so there will be no next turn 

        document.getElementById("output").innerHTML = winner + " is the winner!";
    }     
    else if(isFree(elementId)) {  //check if square is available
        
        if (turns % 2 == 0) {
            symbol = "X";
            player = "O";
         }
         else {
             symbol = "O";
             player = "X";
         }
    
         document.getElementById(elementId).innerHTML = symbol;
         turns++;

         checkWin();
         if (winner != undefined) {
            document.getElementById("output").innerHTML = winner + " is the winner!";
            highlight();
        }     
         else if (turns > 8) {
            document.getElementById("output").innerHTML = "Game over";
            gameOver();
         }
         else {
            document.getElementById("output").innerHTML = "Player: " + player;
         }
    }
    else if (isFree(elementId) == false) { //not ok to place game piece on top of others
        document.getElementById("output").innerHTML = "You probably know it's against the rules.";
    }
 }

 function isFree(elementId) {
    var content = document.getElementById(elementId).innerHTML;
    if (content != "X" && content != "O") {
        return true;
    }
    else {
        return false;
    }
 }

 function checkWin() {
    var values = document.getElementsByClassName("square"); //get all divs(squares) into array
    for(const pattern of winnerPatterns) {  //patterns to check for, using values as index

        if (values[pattern[0]].innerHTML === "" || values[pattern[1]].innerHTML === "" || values[pattern[2]].innerHTML === "") {
                
            continue;
        }
        if (values[pattern[0]].innerHTML === values[pattern[1]].innerHTML &&
            values[pattern[0]].innerHTML === values[pattern[2]].innerHTML) {

                winner = values[pattern[0]].innerHTML;
                winnerArray = [pattern[0], pattern[1], pattern[2]];
                break;
        }
    }
 }

 function reset() {
     var row = document.getElementById("gameArea");
     var squares = row.getElementsByClassName("square");
     var i;
     
     for (i = 0; i < squares.length; i++) {
         squares[i].innerHTML = "";
         squares[i].style.backgroundColor = "white";
     }

     turns = 0;
     player = "X";
     winner = undefined;
     document.getElementById("output").innerHTML = "Player: " + player;
 }

function highlight() { //happy colours for the winner
    winnerArray.forEach(element => {
        document.getElementById(element + 1).style.backgroundColor = "LemonChiffon";
    });
 }

 function gameOver() {
    
    var row = document.getElementById("gameArea");
    var squares = row.getElementsByClassName("square");
    var i;
    
    for (i = 0; i < squares.length; i++) {
        squares[i].innerHTML="<img src=\"crying.png\" height=\"60px\" width=\"60px\">";
    }
 }
