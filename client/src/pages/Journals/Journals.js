import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Recorder from "../../components/Recorder/Recorder";
import UserContext from "../../context/UserContext";

const Journals = () => {
    const {user} = useContext(UserContext);
    document.title = `${user.name}'s journals`;

    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");


    return (
        <>
            <Link to="/logout">Logout</Link>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title} name="title"/>
            <textarea onChange={e => setCaption(e.target.value)} value={caption} name="title"/>
           <Recorder/>
        </>
    );
}

export default Journals;