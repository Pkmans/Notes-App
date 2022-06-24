import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);

    /*
    Fetch all People the moment this App component loads for the first time
    Notes: The proxy enables us to use axios without the full url http://localhost:4747/api/people
           The empty array [] parameter ensures that the code inside useEffect() runs once
    */
    useEffect(() => {
        axios.get("/api/notes")
          .then((res) => {setNotes(res.data)})
          .catch((err) => console.error(err));
      }, []);


    /*
    Add a person to DB and update state
    Notes: The proxy enables us to use axios without the full url http://localhost:4747/api/person/add
    */
    function AddNote(newNote) {
        axios.post("/api/note/add", newNote)
            .then((res) => setNotes(prevNotes => {
                return [...prevNotes, res.data];
            }))
            .catch((err) => console.log(err));
    }

    function deleteNote(id, deleteNote, isConfirmed) {
        if (!isConfirmed) return;

        axios.post("/api/note/delete", deleteNote)
            .then((res) => setNotes(() => {
                return notes.filter((note) => {
                    return note._id !== id;
                });
            }))
            .catch((err) => console.log(err));
    }

    function editNote(editedNote, id, noteToEdit) {
        axios.post("/api/note/edit", {editedNote, noteToEdit})
        

        let updatedNotesList = [...notes];

        let foundNote = notes.find((note, index) => {
            return index === id;
        });
        
        let updatedNote = {
            ...foundNote, 
            title: editedNote.title, 
            content: editedNote.content
        };

        updatedNotesList[id] = updatedNote;

        setNotes(updatedNotesList);
    }

    return (
        <div id="bootstrap-override">
            <Header />
            <CreateArea
                AddNote={AddNote}
            />

            {notes.map((note) => {
                return <Note 
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    content={note.content}
                    xPos={note.xPos}
                    yPos={note.yPos}
                    deleteNote={deleteNote}
                    editNote={editNote}
                />
            })}

            <Footer />
        </div>);
}

export default App;
