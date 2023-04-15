
import Note from "./Note";


const Home = (props) => {
    //destructing syntax
       const {showAlert}=props;
    return (
        <>
            <Note showAlert={showAlert}/>
        </>
    )
}

export default Home
