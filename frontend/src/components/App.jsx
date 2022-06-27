import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);

    /*
    Fetch all Notes when App loads for the first time
    Notes: The proxy enables us to use axios without the full url http://localhost:4747/api/people
           The empty array [] parameter ensures that the code inside useEffect() runs once
    */
    useEffect(() => {
        axios.get("/api/notes")
            .then((res) => { setNotes(res.data) })
            .catch((err) => console.error(err));

    }, []);

    /* Add Note to DB and update state */
    function AddNote(newNote) {
        axios.post("/api/note/add", newNote)
            .then((res) => setNotes(prevNotes => {
                return [...prevNotes, res.data];
            }))
            .catch((err) => console.log(err));
    }

    /* Delete Note and update state */
    function deleteNote(id, isConfirmed) {
        if (!isConfirmed) return;

        axios.post("/api/note/delete", { id })
            .then(() => setNotes(() => {
                return notes.filter((note) => {
                    return note._id !== id;
                });
            }))
            .catch((err) => console.log(err));
    }

    /* Edit Note and update state */
    function editNote(editedNote, id) {
        axios.post("/api/note/edit", { editedNote, id })
            .then(() => {
                // Update state based on local array 
                let updatedNotesList = [...notes];
                let indexFound = null;

                let foundNote = notes.find((note, index) => {
                    if (note._id === id) { indexFound = index };

                    return note._id === id;
                });

                let updatedNote = {
                    ...foundNote,
                    title: editedNote.title,
                    content: editedNote.content
                };

                updatedNotesList[indexFound] = updatedNote;
                setNotes(updatedNotesList);
            })
    }

    /* Most recently focused Note is rendered above all other Notes */
    function focusNote(id) {
        let highestIndex = 0;

        notes.forEach(note => {
            if (note.zIndex >= highestIndex) {
                highestIndex = note.zIndex + 1;
            }
        })

        axios.post("/api/note/focus", { id: id, index: highestIndex })
            .then((res) => {
                // Re-renders App() so Note components have updated zIndex values
                setNotes(res.data);
            })
    }

    return (
        <div id="bootstrap-override">
            <Header />
            <CreateArea
                AddNote={AddNote}
            />

            <div className="notes-container">
                {notes.map((note) => {
                    { console.log("note index is: ", note.zIndex) }
                    return <Note
                        key={note._id}
                        id={note._id}
                        title={note.title}
                        content={note.content}
                        xPos={note.xPos}
                        yPos={note.yPos}
                        beenDragged={note.beenDragged}
                        locked={note.locked}
                        zIndex={note.zIndex}
                        notes={notes}
                        deleteNote={deleteNote}
                        editNote={editNote}
                        focusNote={focusNote}
                    />
                })}
            </div>

            <Footer />
        </div>);
}

export default App;
