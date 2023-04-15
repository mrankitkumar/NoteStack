import React, { useState } from "react";
import NoteContext from "./notesContext";
//we create a state we use this state any where
const NotesState = (props) => {
    const host = "http://localhost:3001"
    // const s1={
    //   "name":"Ankit",
    //   "class":"cse"
    // }
    // const  [state,setState]=useState(s1);
    // const update=()=>{

    //     setTimeout(()=>
    //     {
    //         setState({
    //             "name":"ram",
    //             "class":"cse-b"
    //         })

    //     },1000);
    // }

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    //get all notes 
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
           // body: JSON.stringify(title, description, tag)

        });
        const json=await response.json();
        console.log(json);
        setNotes(json);
    }

    //Add note
    const addNote = async (title, description, tag) => {
        //todo api call
        //Api call to backend
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
    

        });
        const note = await  response.json();
        //logic to edit 1
    //   console.log(json)
    //     console.log("Adding a new note");
    //     const note = {
    //         "tag": "pers",
    //         "_id": "640334cdb036a72f7c29eae5",
    //         "title": "my titsamm,",
    //         "description": "Dbms  bjkgohwq;'l",
    //         "user": "6402cfb52123105db448052f",
    //         "date": "2023-03-04T12:08:45.520Z",
    //         "__v": 0
    //     }

        //   setNote(notes.push(note));
        console.log(note);
        setNotes(notes.concat(note));
    }
    //delete a note
    const deleteNote = async(id) => {
        //Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
           
        });
        const json = await response.json();
        console.log(json);
    
        console.log("deleting the notes with id" + id);
        // see in the note if notes._id !=id this means it present in the notes
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);

    }


    //edit note
    const editNote = async (id, title, description, tag) => {
        //Api call to backend
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({id,title, description, tag})

        });
        const json =await response.json();
       const  newNote=notes;
        //logic to edit 1
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id == id) 
            {
                newNote.title = title;
                newNote.description = description;
                newNote.tag = tag;
                break;
            }
           
        }
       console.log(newNote);
        setNotes(newNote);

    }
    return (
        // <NoteContext.Provider value={{state:state,update:update}}>
        //    {props.children}
        // </NoteContext.Provider>
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>


    )
}
export default NotesState;