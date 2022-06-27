import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';

function Note(props) {
    // Hook States
    const [dragDisabled, setDragDisabled] = useState(props.locked);
    const [position, setPosition] = useState({ xPos: props.xPos, yPos: props.yPos });

    /* Set Notes lock and Save to DB */
    function toggleLock() {
        axios.post("api/note/toggleLock", { id: props.id, locked: !dragDisabled })
            .then(() => {
                setDragDisabled(prevValue => {
                    return !prevValue;
                })
            })
    }

    /* Save Note's updated position to DB */
    useEffect(() => {
        axios.post("/api/note/updateposition", { position, id: props.id });
    }, [position]);

    return <Draggable
        bounds="parent"
        disabled={dragDisabled}
        handle="strong"
        onStop={(event, data) => {setPosition({ xPos: data.x, yPos: data.y })}}
        defaultPosition={{ x: props.xPos, y: props.yPos }}
        onMouseDown={() => {props.focusNote(props.id)}}
    >
        <div className='note' style={{ zIndex: props.zIndex }}>
            <strong style={{ cursor: !dragDisabled && "move" }}></strong>

            <div className="noteBox">
                <h1>{props.title}</h1>
                <p>{props.content}</p>

                <button onClick={toggleLock}>
                    {dragDisabled ? <LockIcon /> : <LockOpenIcon />}
                </button>

                {/* Popup Screens */}
                <EditPopup title={props.title} content={props.content} editNote={(editInput) => {props.editNote(editInput, props.id)}} />
                <DeletePopup deleteNote={(isConfirmed) => {props.deleteNote(props.id, isConfirmed)}} />
            </div>

        </div>
    </Draggable>
}

export default Note;