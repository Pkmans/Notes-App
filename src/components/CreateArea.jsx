import React, {useState} from "react";

function CreateArea(props) {
    const [note, setNote] = useState({title: "", content: ""});

    function handleChange(event) {
        const {name, value} = event.target;
        
        setNote(prevNote => {
             return {...prevNote, [name]: value}
        });    
      
    }

    function handleClick(event) {
        event.preventDefault();

        props.AddNote(note);
        setNote({title: "", content: ""});
    }

    return (
        <div>   
            <form>
                <input onChange={handleChange} name="title" placeholder="Title" value={note.title}></input>
                <textarea onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={note.content}></textarea>
                <button onClick={handleClick}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;