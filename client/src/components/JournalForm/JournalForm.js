import { motion } from "framer-motion";
import { useState } from "react";
import { BIG_BLUE_BUTTON } from "../../tailwind/tailwind";
import Modal from "../Modal/Modal";
import Recorder from "../Recorder/Recorder";
import { createJournal } from "../../events/Journals";

const textAreaVariants = {
    focus: {
        height: "150px", 
        transition: {type: "tween"}
    }
}

const JournalForm = ({ show, clickHandler, accessToken }) => {

    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [audioJournal, setAudioJournal] = useState({
        audio: null,
        source: ""
    });
    const [showAudioJournal, setShowAudioJournal] = useState(false);

    const createJournalHandler = e => createJournal(accessToken, e, title, setTitle, caption, setCaption, audioJournal, setAudioJournal);

    return(
        <>
            <Modal title="Create new journal" show={show} clickHandler={clickHandler}>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} name="title" placeholder="Enter journal title" className="p-1 m-1 rounded border-2 border-grey-200 focus:border-primary-btn focus:outline-none"/>
                <motion.textarea
                    variants={textAreaVariants} 
                    whileFocus="focus"
                    exit="exit"
                    onChange={e => setCaption(e.target.value)} value={caption} name="title" placeholder="Enter journal caption" className="p-1 m-1 rounded resize-none border-2 border-grey-200 focus:border-primary-btn focus:outline-none"/>
                <Recorder setAudioJournal={setAudioJournal}/>
                <input type="submit" value={"Save journal"} className={BIG_BLUE_BUTTON} onClick={createJournalHandler}/>        
            </Modal>
        </>

    );
}

export default JournalForm;