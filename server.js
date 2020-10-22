// Dependencies
let express = require("express");
let path = require("path");

// Express App
let app = express();
app.use(express.static("public"));
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=====================
// Data
let notes = [
    {
        title: "Wednesday Plans",
        text: "I just want to go home."
    }
];

//=====================
// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});




//=====================
// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

//--------------------------------------------------------------------
// app.get("/api/notes", function(req, res) {
//     res.sendFile()
// })

// Displays all notes
app.get("/notesList", function(req, res) {
    return res.json(notes);
});

// // Create new notes
// app.post("/notesList", function(req, res) {
//     newNote = req.body;
//     // Using a RegEx Pattern to remove spaces from newCharacter
//     newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
//     console.log(newNote);
//     characters.push(newNote);
//     res.json(newNote);
// });