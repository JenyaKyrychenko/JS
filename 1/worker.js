onmessage = function(data) {
    var value1 = data.data[0];
    var value2 = data.data[1];
    var result = value1 * value2;

    console.log("Воркер получил! " + result);
    if(isNaN(result)){
        postMessage('Введите число!');
    } else {
        postMessage('Result: ' + result);
    }
 }