require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const path     = require("path");
const app      = express();
 
const PORT     = process.env.PORT || 4747;
const DB_URI   = "mongodb+srv://admin-aaron:dz4QyDNd6nma9eKO@cluster0.vjl4y.mongodb.net/"
const DB       = "reactDB";
 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish DB connection
mongoose.connect(DB_URI + DB);
 
const db = mongoose.connection;
 
// Event listeners
db.once('open', () => console.log(`Connected to ${DB} database`));
 
// Create Schema
let NoteSchema = new mongoose.Schema(
   {
      title: String,
      content: String
   },
   { collection: "notes" }
);
 
// Create Model
let Note = db.model("Note", NoteSchema);
 
// Route to Get all Notes
app.get("/api/notes", (req, res) => {
   Note.find({}, {__v: 0}, (err, docs) => {
      if (!err) {
         res.json(docs);
      } else {
         res.status(400).json({"error": err});
      }
   });
})
 
// ------------ Deployment ------------ //

// __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get("*", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// })

// ------------ Deployment ------------ //

// Route to Add a Note
app.post("/api/note/add", (req, res) => {
   let note = new Note(req.body);
   
   note.save((err, result) => {
      if (!err) {
         res.json(result._doc); // renders updated notes lists somehow???
      } else {
         res.status(400).json({"error": err});
      }
   });

})

// Route to Delete a Note
app.post("/api/note/delete", (req, res) => {
    let noteTitle = req.body.title;
    let noteContent = req.body.content;

    Note.deleteOne({title: noteTitle, content: noteContent}, (err, result) => {
        if (!err) {
            res.json(result._doc); // renders updated notes lists somehow???
         } else {
            res.status(400).json({"error": err});
         }
    });
})

// Route to Edit a Note
app.post("/api/note/edit", (req, res) => {
    const editedTitle = req.body.editedNote.title;
    const editedContent = req.body.editedNote.content;
    const {title, content} = req.body.noteToEdit;

    Note.updateOne({title: title, content: content}, {title: editedTitle, content: editedContent}, (err, result) => {
        if (!err) {
            res.json(result._doc); // renders updated notes lists somehow???
         } else {
            res.status(400).json({"error": err});
         }
    })
})
 
app.listen(PORT, () => {
   console.log(app.get("env").toUpperCase() + " Server started on port " + (PORT));
});