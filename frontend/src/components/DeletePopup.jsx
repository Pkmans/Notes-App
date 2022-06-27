import React, { useEffect, useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import DeleteIcon from '@mui/icons-material/Delete';


function DeletePopup(props) {
    const mountedRef = useRef();  // used to prevent useEffect call on first render

    // Hook States
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [show, setShow] = useState(false);

    // React-Modal helper functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function confirmDelete() {
        setIsConfirmed(true);
        handleClose();
    }

    /* Deletes Note if user confirms deletion */
    useEffect(() => {
        if (mountedRef.current) {
            props.deleteNote(isConfirmed);
        }

        mountedRef.current = true;
    }, [isConfirmed]);

    
    return (
        <>
            {/* Button to trigger Popup */}
            <Button className="deleteButton" variant="primary" onClick={handleShow}>
                <DeleteIcon />
            </Button>

            {/* Popup */}
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Woah there!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this note?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Maybe not
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Absolutely
                    </Button>
                </Modal.Footer>
                
            </Modal>
        </>
    );
}

export default DeletePopup;