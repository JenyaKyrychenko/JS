(function () {

    const DB_NAME = 'users';
    const DB_VERSION = 2;
    const DB_STORE_NAME = 'customers';
    var db;

    var customerData = [
        {id: '1', name: "Ivan", lastName: 'Petrov', birthData: '11.05.2000', email: 'ivan33@gmail.com'},
        {id: '2', name: "Semen", lastName: 'Kaleka', birthData: '01.03.1986', email: 'chernobyl@gmail.com'}
    ];

    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = function (event) {
        db = request.result;
        console.log("ON SUCCESS");

        var transaction = db.transaction(DB_STORE_NAME, "readwrite");
        var objectStore = transaction.objectStore(DB_STORE_NAME);
        customerData.forEach(function (customer) {
            let request = objectStore.add(customer);
            request.onsuccess = function(event) {
                // event.target.result === customer.ssn;
            };
        })

        var tran = db.transaction(DB_STORE_NAME,'readonly').objectStore(DB_STORE_NAME);
        var result = tran.get('2');
        result.onerror = function () {
            //
        };
        result.onsuccess = function (event) {
            console.log("Name for id 2 is " + result.result.lastName);
        }
    };

    request.onerror = function (event) {
        console.error(request.errorCode);
    };

    request.onupgradeneeded = function (event) {
        console.log("up");
        var db = event.target.result;

        var objectStore = db.createObjectStore(DB_STORE_NAME, {keyPath:"id", autoIncrement:true});
        objectStore.createIndex('name','name',{unique:true});
        objectStore.createIndex('lastName','lastName',{unique:true});
        objectStore.createIndex('email','email',{unique:true});

        objectStore.transaction.oncomplete = function (event) {
            console.log('UP OK!');
        };
    };

})();