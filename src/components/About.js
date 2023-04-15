import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/notesContext'
const About = () => {
    // const a=useContext(noteContext);
    // useEffect(()=>{
    //     a.update();
    //    // react-hooks/exhaustive-deps
    // },[])
  return (
    <div>
      {/* This is About{a.state.name} and class is {a.state.class} */}
    </div>
  )
}

export default About
