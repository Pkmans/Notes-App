import React, {useState} from 'react';
import Draggable from 'react-draggable';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Note(props) {
    const [dragDisabled, setDragDisabled] = useState(true);

    function handleClick() {
        setDragDisabled(prevValue => {
            return !prevValue;
        })
    }

    function editNote(input) {
        props.editNote(input, props.id, { title: props.title, content: props.content });
    }

    function deleteNote(isConfirmed) {
        props.deleteNote(props.id, { title: props.title, content: props.content }, isConfirmed);
    }

    return <Draggable disabled={dragDisabled}>
        <div className='note'>
        
            <h1>{props.title}</h1>
            <p>{props.content}</p>

            <button onClick={handleClick}>
                {dragDisabled ? <LockIcon /> : <LockOpenIcon />}
            </button>
            <EditPopup title={props.title} content={props.content} editNote={editNote} />
            <DeletePopup deleteNote={deleteNote} />
            
        </div>
    </Draggable>
}

export default Note;