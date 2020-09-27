

(function () {

    const DB_NAME = 'users';
    const DB_VERSION = 2;
    const DB_STORE_NAME = 'customers';
    var db;
    var data;


    var btn = document.getElementById('success');
    btn.addEventListener('click',()=>{
        d = document.getElementById('title').value;
        data = {id: '5', name: d, lastName: 'OOOOOO', birthData: '11.05.2000', email: 'ivanf33@gmail.com'};
        openDB();
    });



    var customerData = [
        {id: '1', name: "Ivan", lastName: 'Petrov', birthData: '11.05.2000', email: 'ivan33@gmail.com'},
        {id: '2', name: "Semen", lastName: 'Kaleka', birthData: '01.03.1986', email: 'chernobyl@gmail.com'}
    ];

    function openDB() {
        console.log(data);
        var request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onsuccess = function (event) {
            db = request.result;
            console.log("ON SUCCESS");

            var transaction = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
            var r = transaction.put(data);
            r.onsuccess = function () {
                console.log('GGGG');
            }

            getName(DB_STORE_NAME,'readonly');

            // var tran = db.transaction(DB_STORE_NAME, 'readonly').objectStore(DB_STORE_NAME);
            // var result = tran.get('5');
            // result.onerror = function () {
            //     //
            // };
            // result.onsuccess = function (event) {
            //     console.log("Name for id 2 is " + result.result.name);
            // }
        };

        function getName(store,type){
            let transaction = db.transaction(store,type).objectStore(store);
            let r = transaction.get('2');
            r.onsuccess = function () {
                console.log("Name for id 2 is " + r.result.name);
            }
        }

        request.onerror = function (event) {
            console.error(request.errorCode);
        };

        request.onupgradeneeded = function (event) {
            console.log("up");
            let db = event.target.result;

            var objectStore = db.createObjectStore(DB_STORE_NAME, {keyPath: "id", autoIncrement: true});
            objectStore.createIndex('name', 'name', {unique: true});
            objectStore.createIndex('lastName', 'lastName', {unique: true});
            objectStore.createIndex('email', 'email', {unique: true});

            objectStore.transaction.oncomplete = function (event) {
                console.log('UP OK!');
            };
        };
    };

})();