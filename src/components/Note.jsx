import React, {useState} from 'react';
import Popup from './Popup';
import DeleteIcon from '@mui/icons-material/Delete';

function Note (props) {
    const [isEditable, setIsEditable] = useState(false);

    function editNote(input) {
        props.editNote(input, props.id);
    }
    


    return <div className='note'>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        {/* <button onClick={editNote} className="edit"><EditIcon /></button> */}
        <button className="deleteButton" onClick={() => {props.deleteNote(props.id)}}><DeleteIcon /></button>

        <Popup title={props.title} content={props.content} editNote={editNote}/>
    </div>
}

export default Note;