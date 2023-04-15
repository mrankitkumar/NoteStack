import React, { useContext, useEffect, useRef, useState } from 'react'
//import use context
import noteContext from '../context/notes/notesContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else{
      navigate("/Login");
      
    }
   
    //getNotes();
    // eslint-disable-next-line
  }, [])
  //use ref hook
  const ref = useRef(null);
  const refclose = useRef(null);

  //arraw functions
  const updateNote = (currentNote) => {
    console.log("edit-----");
    ref.current.click();
    //this set the value of note in and title and discription is filled and also modal value is filled with value
    setNote({
      id: currentNote._id, etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    })
   
    // ref.current.click();

  }

  const handleclick = (e) => {
    //for not loding the page
    //e is event
    // e.preventDefault();
    //after submiting noes add the value in  to NotesState in addNotes function
    console.log("Update the note");
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
    props.showAlert("Updated Sussefully","success");

  }

  const onchange = (e) => {
    //... spresd operater
    //...notes=>those value in notes ka hai oo rahay but jo aagay properties liki ja rahi hai usko override kardena
    // e.target.name in the  on onchange the those value may likoo ga oo name kay barabar hoo jayaga
    // jo bhi name hai usko value kay barabar kar doo
    //jo value may input may likoo ga uska value joo lika hoo uskay barabar ho jaya ga
    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />


      <button type="button" class="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className='container my-3'>
                <form class="my-3">
                  <div className="mb-3">
                    <label htmlfor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlfor="exampleInputPassword1" className="form-label">Descriptions</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlfor="title" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" onChange={onchange} />
                  </div>
                </form>
              </div>
            </div>

            <div class="modal-footer">
              <button ref={refclose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleclick} class="btn btn-primary">Update Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container row my-3'>
        <h2>Your Notes</h2>
        {notes.length == 0 && "No notes to display"}
        <div className='container row my-3'>
          {notes.map((note) => {
            //pass the props to notesitem and i
            return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
