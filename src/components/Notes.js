import React, { useContext, useEffect, useRef, useState } from 'react';// eslint-disable-next-line
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate= useNavigate();
    const { notes, GetNotes, EditNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            GetNotes()
        }
        else{
            navigate("/login");
        }
        
    }, [navigate,GetNotes]);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        
    };

    const handleonClick = (e) => {
        console.log("Updating the Note...", note)
        EditNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");
        // Call a function to handle form submission, e.g., handleAddNote
        // handleAddNote();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const scroll = {
        overflowY: 'scroll',
        maxHeight: '400px',
        visibility: 'visible',
        hidden: false,
        position: 'sticky'
    };
    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal" // Use data-bs-toggle for Bootstrap 5
                data-bs-target="#exampleModal" // Use data-bs-target for Bootstrap 5
            >
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="Tag" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} placeholder="Title" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required placeholder="Description" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleonClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Your Notes</h2>
            <div className="row my-" style={notes.length === 0 ? null :scroll}>
                <div className='container mx-2'>
                    {notes.length === 0 && "No Notes to Dispaly"}
                </div>
                {notes.map((note) => (
                    <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                ))}
            </div>
        </>
    );
}

export default Notes;