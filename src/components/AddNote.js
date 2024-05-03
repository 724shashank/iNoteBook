import React, { useState, useContext } from 'react'
import noteContext from "../context/notes/noteContext"
function AddNote(props) {
    const context = useContext(noteContext);
    const { AddNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleonClick = (e) => {
        e.preventDefault();
        AddNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <div className="classname my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" placeholder="Tag" onChange={onChange} value={note.tag} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Title" onChange={onChange} value={note.title} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Description </label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={onChange} value={note.description} minLength={5} required />

                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleonClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote