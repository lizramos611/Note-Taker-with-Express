const fs = require('fs');
const path = require('path');
const router = require('express').Router();
let data = require('../db/db.json');

const {v4:uuidv4} = require("uuid");
const { json } = require('body-parser');


router.get("/notes", function (req, res) {
    res.json(data);
})

router.post("/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = uuidv4();
    data.push(newNote);
    fs.writeFileSync(path.join(__dirname, "..db/db.json"), JSON.stringify(data));
    res.json(data);
    console.log(data);
    
});


router.delete("/notes/:id", function (req, res) {
    let noteId = req.params.id;
    let newInfo = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    data = newInfo.filter(notes =>notes.id !==noteId);
    fs.writeFileSync(path.join(__dirname, '..db/db.json', JSON.stringify(data)));
    res.json(data)
});



module.exports = router;
