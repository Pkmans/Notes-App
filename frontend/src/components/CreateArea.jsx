import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    // Screen dimension calculation
    const quarterScreenWidth = window.innerWidth / 4;
    const halfScreenWidth = window.innerWidth / 2;
    const createX = Math.floor((Math.random() * halfScreenWidth)) + quarterScreenWidth; //between 400 - 1200
    const createY = Math.floor(Math.random() * 100) + 1; //between 0 - 100

    // Hook States
    const [note, setNote] = useState({ title: "", content: "", xPos: createX, yPos: createY, beenDragged: false, locked: false, zIndex: 0});
    const [expandArea, setExpandArea] = useState(false);

    /* Update Note Input */
    function updateInput(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return { ...prevNote, [name]: value }
        });
    }

    /* Create Note and clear Input texts */
    function createNote(event) {
        event.preventDefault();

        const inputEmpty = note.title.trim().length === 0 && note.content.trim().length === 0;
        
        if (!inputEmpty) {
            props.AddNote(note);
            setNote({ title: "", content: "", xPos: createX, yPos: createY, beenDragged: false});
        }
    }

    return (
        <div>
            <form className="create-note">
                {/* Note Title Area */}
                {expandArea &&
                    <input
                        onChange={updateInput}
                        name="title"
                        placeholder="Title"
                        value={note.title}>
                    </input>
                }
                
                {/* Note Content Area */}
                <textarea
                    onChange={updateInput}
                    onClick={() => {setExpandArea(true)}}
                    name="content"
                    placeholder="Take a note..."
                    rows={expandArea ? "3" : 1}
                    value={note.content}>
                </textarea>

                {/* Create Note Button */}
                <Zoom in={expandArea}>
                    <Fab onClick={createNote} color="primary">
                        <AddIcon />
                    </Fab>
                </Zoom>

            </form>
        </div>
    );
}

export default CreateArea;