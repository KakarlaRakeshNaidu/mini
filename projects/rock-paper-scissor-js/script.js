const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const uScore=document.querySelector("#user-score"); //uScore=score of user to be displayed 
const cScore=document.querySelector("#comp-score");

let userScore = 0;
let compScore = 0;



const gameDraw = () => {
    msg.innerText = "Game Draw,  play again !"
    msg.style.backgroundColor="#081b31";
    

}

const genComChoice = (userChoice) => {

    //to generate random choice 
    //store choices in arr
    const choices = ["rock", "paper", "scissor"];
    //using math.random() object random no. can be generated ,with these idxs choice can be taken from choices array
    // random number need to be generated that to without decimals use math.floor() to remove decimals
    //random number need to be in 0-2 so use math.random*3
    let randomIdx = Math.floor(Math.random() * 3);
    return choices[randomIdx];

}

const showWinner=(userWin,userChoice,comChoice)=>{
    //userwin==true user wins else comp wins
    if(userWin){
        userScore++;
        msg.innerText=`You Win !,${userChoice} beats ${comChoice}`;
        msg.style.backgroundColor="green";
        
        uScore.innerText=userScore;
    }
    else{
        compScore++;
        msg.innerText=`you lose,${comChoice} beats ${userChoice}`;
        msg.style.backgroundColor="red";
      
        cScore.innerText=compScore;
        
    }
}

//when choice was clicked need to take action
choices.forEach(choice => {
    //add event listner
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log( "user choice ",userChoice);

        //generate comp choices
        let comChoice = genComChoice(userChoice);
        console.log("comp choice",comChoice);

        //show who is winning
        if (userChoice == comChoice) {//it is draw
            gameDraw();//shows game is drawed

        } else { //both are not same choices
            let userWin = true;//to show who is winning
            if (userChoice === "rock") {
                //comp choices=paper,scissor
                //if comp CHoice =paper comp wins else user wins
                userWin = comChoice === "paper" ? false : true;//using ternary statement
                showWinner(userWin,userChoice,comChoice);
            }
            else if (userChoice === "paper") {
                userWin = comChoice === "scissor" ? false : true;
                showWinner(userWin,userChoice,comChoice);
            }
            else {//userCHoice=scissor
                userWin = comChoice === "rock" ? false : true;
                showWinner(userWin,userChoice,comChoice);

            }

        }


    })

});