import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { DeleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className='card my-3'>
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title"> {note.tag}</h5>
                        <i className="fa-solid fa-trash-can-arrow-up mx-1" onClick={() => { DeleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}></i>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.title}</p>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

