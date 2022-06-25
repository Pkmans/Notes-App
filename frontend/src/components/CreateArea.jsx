import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const quarterScreenWidth = window.innerWidth / 4;
    const halfScreenWidth = window.innerWidth / 2;

    const createX = Math.floor((Math.random() * halfScreenWidth)) + quarterScreenWidth; //between 400 - 1200
    const createY = Math.floor(Math.random() * 100) + 1; //between 0 - 100

    const [note, setNote] = useState({ title: "", content: "", xPos: createX, yPos: createY, beenDragged: false, locked: false});
    const [expandArea, setExpandArea] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return { ...prevNote, [name]: value }
        });
    }

    function handleClick(event) {
        event.preventDefault();

        const inputEmpty = note.title.trim().length === 0 && note.content.trim().length === 0;
        
        if (!inputEmpty) {
            props.AddNote(note);
            setNote({ title: "", content: "", xPos: createX, yPos: createY, beenDragged: false});
        }
    }

    function expandInputArea() {
        setExpandArea(true);
    }

    return (
        <div>
            <form className="create-note">
                {expandArea &&
                    <input
                        onChange={handleChange}
                        name="title"
                        placeholder="Title"
                        value={note.title}>
                    </input>
                }

                <textarea
                    onChange={handleChange}
                    onClick={expandInputArea}
                    name="content"
                    placeholder="Take a note..."
                    rows={expandArea ? "3" : 1}
                    value={note.content}>
                </textarea>

                <Zoom in={expandArea}>
                    <Fab onClick={handleClick} color="primary">
                        <AddIcon />
                    </Fab>
                </Zoom>

            </form>
        </div>
    );
}

export default CreateArea;