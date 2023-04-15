
import React, { useState } from "react";
//now switch replace as routes
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NotesState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = ( message, type )=> {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>

              <Route exact path="/" element={<Home showAlert={showAlert}/>}>
              </Route>

              <Route exact path="/About" element={<About />}>
              </Route>
              <Route exact path="/Login" element={<Login showAlert={showAlert}/>}>
              </Route>
              <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}>
              </Route>

            </Routes>

          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
