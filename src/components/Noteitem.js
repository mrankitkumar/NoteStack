import React,{ useContext } from 'react'
import noteContext from '../context/notes/notesContext';
const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
    const {note,updateNote}=props;
  return (
    <div className='col md-3' >
         <div class="card" style={{backgroundColor:'lightblue'}}>
            <div className="card-body my-3">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.tag}</p>
                {/* when click arrow function give argument to deleteNote function */}
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)
                props.showAlert("Deleted Sussefully","success");
              
              }}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
         </div>
    </div>
  )
}

export default Noteitem
