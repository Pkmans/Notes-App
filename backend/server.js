require("dotenv").config();
const { application } = require("express");
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
      content: String,
      xPos: Number,
      yPos: Number,
      beenDragged: Boolean,
      locked: Boolean,
      zIndex: Number
   },
   { collection: "notes" }
);
 
// Create Model
let Note = db.model("Note", NoteSchema);
 
// Route to Get all Notes
app.get("/api/notes", (req, res) => {
   Note.find({}, {__v: 0}, (err, foundNotes) => {
      if (!err) {
         res.send(foundNotes);
      } else {
         res.send(err);
      }
   });
})
 
// ------------ Deployment ------------ //

__dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})

// ------------ Deployment ------------ //

// Route to Add a Note
app.post("/api/note/add", (req, res) => {
   let note = new Note(req.body);
   
   note.save((err, result) => {
      if (!err) {
         res.send(result);
      } else {
         res.send(err);
      }
   });

})

// Route to Delete a Note
app.post("/api/note/delete", (req, res) => {
   const id = mongoose.Types.ObjectId(req.body.id);

    Note.deleteOne({_id: id}, (err, result) => {
        if (!err) {
            res.send(result); 
         } else {
            res.send(err);
         }
    });
})

// Route to Edit a Note
app.post("/api/note/edit", (req, res) => {
    const editedTitle = req.body.editedNote.title;
    const editedContent = req.body.editedNote.content;
    const id = mongoose.Types.ObjectId(req.body.id);

    Note.updateOne({_id: id}, {title: editedTitle, content: editedContent}, (err, result) => {
        if (!err) {
            res.send(result); 
         } else {
            res.send(err);
         }
    })
})

// Route to Save Note Position
app.post("/api/note/updateposition", (req, res) => {
   const x = req.body.position.xPos;
   const y = req.body.position.yPos;
   const id = mongoose.Types.ObjectId(req.body.id);

   Note.updateOne({_id: id}, {xPos: x, yPos: y}, (err, result) => {
      if (!err) {
         res.send(result);
       } else {
         res.send(err);
       }
  })
})

// Route to Save Note Custom Position Boolean
app.post("/api/note/beenDragged", (req, res) => {
   const id = mongoose.Types.ObjectId(req.body.id);

   Note.updateOne({_id: id}, {beenDragged: true}, (err, result) => {
      if (!err) {
          res.send(result);
       } else {
          res.send(err);
       }
  })
})

// Route to Save Note Lock State
app.post("/api/note/toggleLock", (req, res) => {
   const id = mongoose.Types.ObjectId(req.body.id);

   Note.updateOne({_id: id}, {locked: req.body.locked}, (err, result) => {
      if (!err) {
          res.send(result);
       } else {
         res.send(err);
       }
  })
})

// Route to Save Note Z-Index values
app.post("/api/note/focus", (req, res) => {
   const id = mongoose.Types.ObjectId(req.body.id);

   Note.updateOne({_id: id}, {zIndex: req.body.index}, (err, result) => {
      // Re-renders App() so Note components have updated zIndex values
      Note.find({}, {__v: 0}, (err, foundNotes) => {
         if (!err) {
            res.send(foundNotes);
         } else {
            res.send(err);
         }
  })

  
});
  
})
 
app.listen(PORT, () => {
   console.log(app.get("env").toUpperCase() + " Server started on port " + (PORT));
});