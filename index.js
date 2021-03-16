const firebase = require('firebase');
const express = require('express');
const path = require('path');

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

firebase.initializeApp({
    apiKey: "AIzaSyC-M2IN5cJCpgiuE9q9IuAIjkLLOH5Kmpc",
    authDomain: "todolist-andraantariksa.firebaseapp.com",
    databaseURL: "https://todolist-andraantariksa-default-rtdb.firebaseio.com",
    projectId: "todolist-andraantariksa",
    storageBucket: "todolist-andraantariksa.appspot.com",
    messagingSenderId: "537333917823",
    appId: "1:537333917823:web:7a87784cccb05fda92b74a",
    measurementId: "G-4ZZF6JC5QZ"
});

const database = firebase.database();

app.get('/', (req, res) => {
    res.send('Nothing to see here');
});

app.get('/:user_id/:todos_id', (req, res) => {
    const { user_id, todos_id } = req.params;

    database
        .ref(`users/${user_id}/todos/${todos_id}`)
        .on("value",
            (dataSnapshot) => {
                const data = dataSnapshot.val();
                // res.send(dataSnapshot.val());
                res.render('todos', data);
            },
            (reason) => {
                res.send(`Error: ${reason}`);
            });
    // res.send('Nothing to see here');
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
