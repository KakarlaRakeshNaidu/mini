//all things need to be acccesed first
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let msgContainer=document.querySelector(".msg-container");
let newGameBtn=document.querySelector("#new-game");
let msg=document.querySelector("#msg");
//each player gats alternative chances to press btns
//two players are player-x,player-O 
//1st need to check who's turn 

let turno=true;//checks who's turn and if turn of "o" is true then playerx gets cahnce and "x" is there in the btn
let count=0;//to check for draw

//winning pattern -tells who is satisfying winning conditions
//storing winning patterns in 2d arr
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame=()=>{
    turno=true;
    enableBoxes();
    //need to hide winner msg
    msgContainer.classList.add("hide");

};


//when button is clicked x,o should appear in the button and we need to know which button is clicked
//for this we use event listeners to each button
boxes.forEach(box => {
    box.addEventListener("click",()=>{
        console.log("btn clicked");
        //x/o should appear in boxes .by above "turno" we can whether 'x' should appear or 'o' 
        if(turno){ //if turno==true then it is playero chance
            box.innerText="0";
            turno=false;// playero chance completed chance for playerx

        }
        else{//turno=false then it is chance of playerx
            box.innerText="x";
            turno=true;//playerx chance completed chance for playero

        }
        box.disabled=true;//if it is not present then after clicking all boxes if we click on any box it changes it's val
      //now check if any player is winning
      count++;
      let isWinner=checkWinner();
    
      if(count===9 && !isWinner){
        gameDraw();
      }

    })
});
const gameDraw=()=>{
    msg.innerText=`game was drawed`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//when reset game or new game is clicked all boxes are enabled and boxes ahould be empty
const enableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        
    }
};

const disableBoxes=()=>{
    for (let box of boxes) {
        box.disabled=true;
        
    }
};

const displayWinner=(winner)=>{
    msg.innerText=`congratulations ,winner is ${winner}`;
    //to display the msg "hide " int class should be removed
    msgContainer.classList.remove("hide");
    //after declaring winner also remaining empty boxes can also be clicked and winner changes to control that disable all boxes
    //belo func disables all boxes
    disableBoxes();

};
const checkWinner=()=>{
//for checking winner need to follow winPatterns and need to know x/o in winpatterns box
for (let pattern of winPatterns) { //pattern=[0,1,2]
    //checking the values in boxes according to box positions in winPatterns
    let valPos1=boxes[pattern[0]].innerText;//for val in box 0
    let valPos2=boxes[pattern[1]].innerText;//for val in box 1
    let valPos3=boxes[pattern[2]].innerText;//for val in box 2

    //if above 3 values are then player is a winner
    if(valPos1!="" && valPos2!="" && valPos3!=""){
     if(valPos1 === valPos2 && valPos2 === valPos3){
        console.log("winner",valPos1);
        //displays winner on screen
        displayWinner(valPos1);//valpos1 is the winner
     }
    }
}
};

// event listerns when new game or reset game is clicked
resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);

