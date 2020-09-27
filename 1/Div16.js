var allDiv = document.querySelectorAll('div');
var btn = document.querySelector('button');
var clearBtn = document.querySelector('#clear');



function random(num) {
    return Math.floor(Math.random() * num);
}

function draw() {
    allDiv.forEach((e) => {
        e.addEventListener('mousemove', (event) => {
            var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
            event.target.style.backgroundColor = rndCol;
        })
    });
}

function clear() {
    allDiv.forEach((e) => {
        e.style.backgroundColor = 'white';
    });
}

btn.addEventListener('click', draw);
clearBtn.addEventListener('click', clear);
