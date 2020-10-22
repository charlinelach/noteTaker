// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { nextTick } = require("process");

// Express App
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//=====================
// Data
let notes = [];

//=====================
// Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET: Reads from db.json
app.get("/api/notes", function (err, res) {
    try {
        notes = fs.readFileSync("db/db.json", "utf8");
        notes = JSON.parse(notes);

        // can't try without catching errors and responding
    } catch (err) {
        throw (err);
    }

    res.json(notes);
});

// POST: Receives a new note to save and adds it to db.json, then returns the note to the client
app.post("/api/notes", function (req, res) {
    try {

        notes = fs.readFileSync("db/db.json", "utf8");
        console.log(notes);

        // Parse to get an array
        notes = JSON.parse(notes);
        // Set an ID for a note
        req.body.id = notes.length;
        // New notes get added to an array
        notes.push(req.body);

        notes = JSON.stringify(notes);
        // Note added
        fs.writeFile("db/db.json", notes, "utf8", function (err) {

            if (err) throw err;
        });
        // Back into objects and off to clients
        res.json(JSON.parse(notes));

    } catch (err) {
        throw err;
    }
});

// DELETE: Query parameter containing ID of a note to delete
app.delete("/api/notes/:id", function (req, res) {
    try {

        notes = fs.readFileSync("db/db.json", "utf8");

        notes = JSON.parse(notes);

        notes = notes.filter(function (note) {
            return note.id != req.params.id;
        });

        notes = JSON.stringify(notes);

        fs.writeFile("db/db.json", notes, "utf8", function (err) {

            if (err) throw err;
        });


        res.send(JSON.parse(notes));


    } catch (err) {
        throw err;
    }
});


//=====================
// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});