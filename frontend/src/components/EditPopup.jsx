import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { Button, Form } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';


function EditPopup(props) {
    // Hook State
    const [input, setInput] = useState({ title: props.title, content: props.content })

    // Handle Popup State */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* Update Note Input */
    function updateInput(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return { ...prevInput, [name]: value };
        })
    }

    function handleSave() {
        props.editNote(input);
        handleClose();
    }

    return (
        <div>
            {/* Button to trigger Popup */}
            <Button className="editButton" variant="primary" onClick={handleShow}>
                <EditIcon />
            </Button>

            {/* Popup */}
            <Modal show={show} onHide={handleClose}>
            
                <Modal.Header closeButton>
                    <Modal.Title>Editing Note</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Title Input */}
                        <Form.Group className="mb-3" controlId="TitleInput">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                onChange={updateInput}
                                name="title"
                                type="text"
                                value={input.title}
                                autoFocus
                            />

                        {/* Content Input */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ContentInput">
                            <Form.Label>Note</Form.Label>
                            <Form.Control onChange={updateInput} name="content" value={input.content} as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
}

export default EditPopup;