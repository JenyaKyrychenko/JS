
    var value1 = document.querySelector('#number1');
    var value2 = document.querySelector('#number2');


    var myPara = document.createElement('p');

        const myWorker = new Worker('worker.js');
        
        value1.onchange = function() {
            myWorker.postMessage([value1.value,value2.value]);
            console.log("Отправили воркеру 1");
        }

        value2.onchange = function() {
            myWorker.postMessage([value1.value,value2.value]);
            console.log("Отправили воркеру 2");
        }
        
        myWorker.onmessage = function (mulResult) {
            myPara.textContent = mulResult.data;
            console.log("Получено!");
        }

        document.querySelector('.controls').appendChild(myPara);




