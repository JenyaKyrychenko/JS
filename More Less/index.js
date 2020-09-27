
var answers = [];
var randomNumber;

var input = document.getElementById('title');
var btnSuccess = document.getElementById('success');
var btnStart = document.getElementById('start');
var answersLog = document.getElementById('answers');

btnSuccess.addEventListener('click',()=>{
    let data = +input.value;
    if(Number.isInteger(data)){
        if(data>=0 && data<=100) {
            answers.push(data);
            checkAnswer(data);
            answersLog.textContent = answers;
        }else {
            alert('[0;100]');
        }
    }else {
        alert("Please, enter a NUMBER!");
    }
});


btnStart.addEventListener('click',()=>{
    randomNumber = randomNum();
    answers = [];
    answersLog.textContent = 'Ok,Enter your number!';
});


function checkAnswer(answer) {
    console.log(randomNumber);
    if(answer == randomNumber){
        alert("You are right! It's " + randomNumber);
        answers = [];
    } else if(answer > randomNumber){
        alert('Less!');
    } else if(answer < randomNumber){
        alert('More!');
    }
}

function randomNum() {
    return Math.floor(Math.random() * 100);
}

