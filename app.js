let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#newgame-button");
let winMsg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let turnO = true; //playerX,playerO

const winPatterns = [
    // horizontal
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    // vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonal
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    winMsg.classList.add("hide");
    box.style.color = "#ffffff";
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        console.log("box was clicked");
        if(turnO){ // playerO
            box.innerText = "O";
            turnO = false;
            box.style.color = "#4D4847";
        } else { // playerX
            box.innerText = "X";
            turnO = true;
            box.style.color = "#F4FFF8";
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for( let box of boxes){
        box.disabled = true;
    }
    newGameButton.classList.remove("hide");
};

const enableBoxes = () => {
    for( let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    newGameButton.classList.add("hide");
};


const showWinner = (winner) => {
    console.log("winner :",winner);
    msgContainer.classList.remove("hide");
    winMsg.classList.remove("hide");
    winMsg.innerText = `${winner} WON the Game.`;
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // );

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if( pos1Val === pos2Val && pos1Val === pos3Val ){
                showWinner(pos1Val);
                return;
            }
        }
    }
    checkDraw();
};

const checkDraw = () => {
    let allFilled = true;

    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        msgContainer.classList.remove("hide");
        winMsg.classList.remove("hide");
        winMsg.innerText = "It's a Draw!";
        disableBoxes();
    }
};

newGameButton.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);

// resetButton.addEventListener("click",() => {
//     boxes.forEach((box) => {
//         box.innerText = "";
//     });
// });
