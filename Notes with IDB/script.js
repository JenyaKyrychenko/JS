let db;
let dbReq = indexedDB.open('myDB', 2);
let reverseOrder = false;

dbReq.onupgradeneeded = (event) => {
    db = event.target.result;

    let notes;
    if (!db.objectStoreNames.contains('notes')) {
        notes = db.createObjectStore('notes', {autoIncrement: true});
    } else {
        notes = dbReq.transaction.objectStore('notes');
    }

    if (!notes.indexNames.contains('timestamp')) {
        notes.createIndex('timestamp', 'timestamp');
    }
}

dbReq.onsuccess = (event) => {
    db = event.target.result;

    getNote(db, 13);
    getAndDisplayNotes(db);
}

dbReq.onerror = (event) => {
    alert('error opening database ' + event.target.errorCode);
}

const addStickyNote = (db, message) => {
    let tx = db.transaction(['notes'], 'readwrite');
    let store = tx.objectStore('notes');

    let note = {text: message, timestamp: Date.now()};
    store.add(note);

    tx.oncomplete = () => {
        console.log('stored note!');
        getAndDisplayNotes(db);
    }
    tx.onerror = (event) => {
        alert('error storing note ' + event.target.errorCode);
    }
}

const submitNote = () => {
    let message = document.getElementById('newmessage');
    addStickyNote(db, message.value);
    message.value = '';
}

const getNote = (db, value) => {
    let tx = db.transaction(['notes'], 'readonly');
    let store = tx.objectStore('notes');

    let req = store.get(value);

    req.onsuccess = (event) => {
        let note = event.target.result;

        if (note) {
            console.log(note);
        } else {
            console.log('note 1 not found');
        }
    }

    req.onerror = (event) => {
        alert('error getting note 1 ' + event.target.errorCode);
    }
}

const displayNotes = (notes) => {
    let listHTML = '<ul>';
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        listHTML += '<li><button onclick="deleteNote(event)" data-id="' + note.timestamp + '">X</button>';
        listHTML += note.text + ' ' +
            new Date(note.timestamp).toDateString() + '</li>';
    }

    document.getElementById('notes').innerHTML = listHTML;
}

const deleteNote = (event) => {
    const valueTimestamp = parseInt(event.target.getAttribute('data-id'));

    const tx = db.transaction(['notes'], 'readwrite');
    tx.complete = (event) => {
        console.log('Transaction complete');
        getAndDisplayNotes(db);
    };

    tx.onerror = function (event) {
        alert('error in cursor request ' + event.target.errorConde);
    };

    const store = tx.objectStore('notes');
    const index = store.index('timestamp');

    const req = index.getKey(valueTimestamp);

    req.onsuccess = (event) => {
        const key = req.result;
        let deleteRequest = store.delete(key);
        deleteRequest.onsuccess = (event) => {
            console.log('Delete request successful');
        }
        getAndDisplayNotes(db);
    }
}

const getAndDisplayNotes = (db) => {
    let tx = db.transaction(['notes'], 'readonly');
    let store = tx.objectStore('notes');

    let index = store.index('timestamp');

    let req = index.openCursor(null, reverseOrder ? 'prev' : 'next');
    let allNotes = [];

    req.onsuccess = (event) => {
        let cursor = event.target.result;

        if (cursor != null) {
            allNotes.push(cursor.value);
            cursor.continue();
        } else {
            displayNotes(allNotes);
        }
    }

    req.onerror = (event) => {
        alert('error in cursor request ' + event.target.errorCode);
    }
}

function flipNoteOrder(notes) {
    reverseOrder = !reverseOrder;
    getAndDisplayNotes(db);
}