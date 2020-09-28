
var answers = [];
var randomNumber;

var input = document.getElementById('title');
var btnSuccess = document.getElementById('success');
var btnStart = document.getElementById('start');
var answersLog = document.getElementById('answers');

input.focus();

btnSuccess.addEventListener('click',()=>{
    let data = +input.value;
    if(Number.isInteger(data)){
        if(data>=0 && data<=100) {
            answers.push(data);
            checkAnswer(data);
            answersLog.textContent = answers;
        }else {
            alert('[0;100]');
            input.focus();
        }
    }else {
        alert("Please, enter a NUMBER!");
        input.focus();
    }
});


btnStart.addEventListener('click',()=>{
    randomNumber = randomNum();
    answers = [];
    answersLog.textContent = 'Ok,Enter your number!';
    input.focus();
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
    input.focus();
}

function randomNum() {
    return Math.floor(Math.random() * 100);
}

