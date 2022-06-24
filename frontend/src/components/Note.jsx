import React from 'react';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';

function Note (props) {
    function editNote(input) {
        props.editNote(input, props.id, {title: props.title, content: props.content});
    }

    function deleteNote(isConfirmed) {
        props.deleteNote(props.id, {title: props.title, content: props.content}, isConfirmed);
    }
    
    return <div className='note'>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <DeletePopup deleteNote={deleteNote}/>

        <EditPopup title={props.title} content={props.content} editNote={editNote}/>
    </div>
}

export default Note;