(function () {

const customerData = [
    {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com"},
    {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"}
];

const DB_NAME = 'customers';
const DB_VERSION = 3;
const DB_STORE_NAME = 'users';

var db;

var current_view_pub_key;

function openDb() {
    console.log('openDB..');
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (event) {
        db = this.result;
        console.log('openDb DONE!');
    };
    req.onerror = function (event) {
        console.error(event.target.errorCode);
    };

    req.onupgradeneeded = function (event) {
        console.log('openDb.onupgradeneeded');
    }
}

openDb();

})();