import { useState } from "react";
import Recorder from "../../components/Recorder/Recorder";

const name = "Angelo";
const Journals = () => {
    document.title = `${name}'s journals`;

    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");


    return (
        <>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title} name="title"/>
            <textarea onChange={e => setCaption(e.target.value)} value={caption} name="title"/>
           <Recorder/>
        </>
    );
}

export default Journals;