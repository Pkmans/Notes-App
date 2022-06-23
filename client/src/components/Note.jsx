import React, {useState} from 'react';
import Popup from './Popup';
import DeleteIcon from '@mui/icons-material/Delete';

function Note (props) {
    function editNote(input) {
        props.editNote(input, props.id, {title: props.title, content: props.content});
    }
    


    return <div className='note'>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button className="deleteButton" onClick={() => {props.deleteNote(props.id, {title: props.title, content: props.content})}}><DeleteIcon /></button>

        <Popup title={props.title} content={props.content} editNote={editNote}/>
    </div>
}

export default Note;