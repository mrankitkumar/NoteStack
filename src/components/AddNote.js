import React,{ useContext, useState } from 'react'
import noteContext from '../context/notes/notesContext';

const AddNote = (props) => {
    const context=useContext(noteContext);
    //that can be use from context we can declare here or use here eg.. addNotes
    const {addNote}=context;
     //use the state for adding notes 
     const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        //for not loding the page
        //e is event
        e.preventDefault();
        //after submiting noes add the value in  to NotesState in addNotes function
            addNote(note.title,note.description,note.tag);
            props.showAlert("Add Sussefully","success");
            setNote({title:"",description:"",tag:""});
            
    }
   
    const onchange=(e)=>{
        //... spresd operater
        //...notes=>those value in notes ka hai oo rahay but jo aagay properties liki ja rahi hai usko override kardena
        // e.target.name in the  on onchange the those value may likoo ga oo name kay barabar hoo jayaga
        // jo bhi name hai usko value kay barabar kar doo
        //jo value may input may likoo ga uska value joo lika hoo uskay barabar ho jaya ga
          setNote({...note,[e.target.name]:e.target.value});

    }
  return (
    <div>
      <div className='container my-3' style={{height:'400px',backgroundColor:'lightblue',padding:'10px',borderRadius: '30px'}}>
            <h2>Add your Notes</h2>
            <form class="my-3">
                <div className="mb-3">
                    <label htmlfor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlfor="exampleInputPassword1" className="form-label">Descriptions</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlfor="title" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" value={note.tag} onChange={onchange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add notes</button>
            </form>
            </div>
    </div>
  )
}

export default AddNote
