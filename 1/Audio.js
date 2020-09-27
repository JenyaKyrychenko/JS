var btn = document.querySelector('#btn');
var btnStop = document.querySelector('#btn-stop');

var myPara = document.createElement('p');



function randomColor(number){
    return Math.floor(Math.random() * number);
}
var timerId;

btn.addEventListener('click', function (e) {
        timerId = setInterval(()=>{
            var color = 'rgb( ' + randomColor(255) + ', '
                + randomColor(255)
                + ',' + randomColor(255) + ')';
            document.body.style.backgroundColor = color;
            e.target.style.display = 'none';
            myPara.textContent = randomColor(100);
        },200);
});
document.body.appendChild(myPara);

btnStop.addEventListener('click', ()=>{
    setTimeout(() => { clearInterval(timerId);});
    btn.style.display = 'inline';
})
