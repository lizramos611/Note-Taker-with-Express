const path = require('path');
const router = require('express').Router();

//routes to home page
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

//routes to notes page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});


module.exports= router;
