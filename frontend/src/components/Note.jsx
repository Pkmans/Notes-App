import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';

function Note(props) {
    const [dragDisabled, setDragDisabled] = useState(props.locked);
    const [beenDragged, setBeenDragged] = useState(props.beenDragged);
    const [position, setPosition] = useState({ xPos: props.xPos, yPos: props.yPos });

    // Drag Note Functions
    function toggleLock() {
        axios.post("api/note/toggleLock", { id: props.id, locked: !dragDisabled })
            .then(() => {
                setDragDisabled(prevValue => {
                    return !prevValue;
                })
            })
    }

    function firstDrag(event) {
        if (!beenDragged) {
            axios.post("api/note/beenDragged", { id: props.id })
                .then(setBeenDragged(true));
        }
    }

    function finishDrag(event, data) {
        setPosition({ xPos: data.x, yPos: data.y });

    }

    useEffect(() => {
        axios.post("/api/note/updateposition", { position, id: props.id });
    }, [position]);

    // Helper Functions
    function editNote(input) {
        props.editNote(input, props.id);
    }

    function deleteNote(isConfirmed) {
        props.deleteNote(props.id, isConfirmed);
    }

    function focusNote() {
        console.log("focus note called");

        props.focusNote(props.id);
    }

    return <Draggable
        bounds="parent"
        disabled={dragDisabled}
        handle="strong"
        onStart={firstDrag}
        onStop={finishDrag}
        defaultPosition={{ x: props.xPos, y: props.yPos }}
        onMouseDown={focusNote}
    >
        <div className='note' style={{ zIndex: props.zIndex }}>
            <strong style={{ cursor: !dragDisabled && "move" }}></strong>

            <div className="noteBox">
                <h1>{props.title}</h1>
                <p>{props.content}</p>

                <button onClick={toggleLock}>
                    {dragDisabled ? <LockIcon /> : <LockOpenIcon />}
                </button>
                <EditPopup title={props.title} content={props.content} editNote={editNote} />
                <DeletePopup deleteNote={deleteNote} />
            </div>

        </div>
    </Draggable>
}

export default Note;