import { motion } from "framer-motion";
import { useState } from "react";
import Recorder from "../Recorder/Recorder";

const JournalForm = () => {

    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");

    return(
        <div className="flex flex-col justify-center w-2/5 border-2 border-gray-300 rounded p-5">
            <input type="text" onChange={e => setTitle(e.target.value)} value={title} name="title" placeholder="Enter journal title" className="p-1 m-1 rounded border-2 border-grey-200 focus:border-primary-btn focus:outline-none"/>
            <motion.textarea 
                whileFocus={{height: "125px"}}
                onChange={e => setCaption(e.target.value)} value={caption} name="title" placeholder="Enter journal caption" className="p-1 m-1 rounded resize-none border-2 border-grey-200 focus:border-primary-btn focus:outline-none"/>
            <Recorder/>
            <input type="submit" value={"Save journal"} className="bg-primary-btn text-white hover:bg-secondary-btn transition cursor-pointer px-5 py-3 my-2 rounded-full font-bold"/>        </div>
    );
}

export default JournalForm;