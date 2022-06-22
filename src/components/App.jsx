import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import defaultNotes from '../notes';

function App() {
    const [notes, setNotes] = useState([]);

    function AddNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        })
    }

    function deleteNote(id) {
        setNotes(() => {
            return notes.filter((note, index) => {
                return id !== index;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea
                AddNote={AddNote}
            />

            {/* Default Notes */}
            {/* {defaultNotes.map(note => {
                return <Note
                    key={note.key}
                    id={note.key}
                    title={note.title}
                    content={note.content}
                    deleteNote = {deleteNote}
                />
            })} */}

            {notes.map((note, index) => {
                return <Note 
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    deleteNote = {deleteNote}
                />
            })}

            <Footer />
        </div>);
}

export default App;