import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const [note, setNote] = useState({ title: "", content: "", xPos: 0, yPos: 0});
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
            setNote({ title: "", content: "", xPos: 0, yPos: 0});
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