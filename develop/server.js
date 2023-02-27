//requiring to be able to use express
const express = require('express');
const app = express();

//adding in paths
const api = require('./public/index.js');

const path = require('path');

//adding in port number for use
const PORT = process.env.PORT || 3001;

//added in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', api);


//get route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html')));

//get route for notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/piublic/notes.html')));


//port we will be listening on to access site
app.listen(PORT, () =>
console.log(`App is now listening at http://localhost:${PORT}`)); 
