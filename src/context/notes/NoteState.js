import noteContext from "./noteContext";// eslint-disable-next-line
import { useState } from "react";

export const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get All note 

  const GetNotes = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
      });
    const json = await response.json()
    setNotes(json)
  }
  //Add a note 

  const AddNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })

      });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //Delete a Note
  const DeleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        }

      });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note

  const EditNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })

      });
    const json = await response.json();
    console.log(json);
      


    let newNotes = JSON.parse(JSON.stringify(notes))//makng the deep copy of the orignal data which is in database

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, setNotes, AddNote, DeleteNote, EditNote, GetNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
