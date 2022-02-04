import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { BIG_BLUE_BUTTON } from "../../tailwind/tailwind";
import Modal from "../Modal/Modal";
import Recorder from "../Recorder/Recorder";
import { createJournal } from "../../events/Journals";
import ColorBar from "../ColorBar/ColorBar";
import { BLUE } from '../../config/constants';
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Toast from "../Toast/Toast";

const textAreaVariants = {
    focus: {
        height: "150px", 
        transition: {type: "tween"}
    }
}

const JournalForm = ({ show, clickHandler, accessToken, journals, setJournals }) => {

    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [audioJournal, setAudioJournal] = useState({
        audio: null,
        source: ""
    });
    const [currentColor, setCurrentColor] = useState(BLUE);
    const [messageState, setMessageState] = useState({
        message: "", showMessage: false, isError: false
    });
    
    useEffect(() => {
        if (show) return;
        setMessageState({ message: "", showMessage: false, isError: false });
        setTitle("");
        setAudioJournal({audio: null, source: ""});
        setCaption("");
    }, [show])

    const createJournalHandler = e => createJournal(accessToken, e, title, setTitle, caption, setCaption, audioJournal, setAudioJournal, journals, setJournals, currentColor, setCurrentColor, messageState, setMessageState);
    
    return(
        <>
            <Modal title="Create new journal" show={show} clickHandler={clickHandler}>
                <div className="flex w-full items-center relative top-0">
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} name="title" placeholder="Enter journal title" className="pt-1 pr-10 pb-1 pl-1 m-1 w-full rounded border-2 border-grey-200 focus:border-blue-1 focus:outline-none"/>
                    <h1 className="absolute left-[92%] text-sm text-gray-400">{title.length.toString().padStart(3,0)}</h1>
                </div>
                <div className="flex w-full items-center relative top-0">
                    <motion.textarea
                        variants={textAreaVariants} 
                        whileFocus="focus"
                        exit="exit"
                        onChange={e => setCaption(e.target.value)} value={caption} name="title" placeholder="Enter journal caption" className="pt-1 pr-10 pb-1 pl-1 m-1 w-full rounded resize-none border-2 border-grey-200 focus:border-blue-1 focus:outline-none"/>
                    <h1 className="absolute left-[92%] top-[10%] text-sm text-gray-400">{caption.length.toString().padStart(3,0)}</h1>
                </div>
                <ColorBar currentColor={currentColor} setCurrentColor={setCurrentColor}/>
                { audioJournal.source && <AudioPlayer source={audioJournal.source}/> }
                <Recorder 
                    setAudioJournal={setAudioJournal}
                    shouldOutput={true}    
                />
                <input type="submit" value={"Save journal"} className={BIG_BLUE_BUTTON} onClick={createJournalHandler}/>        
            <Toast 
                show={messageState.showMessage} 
                message={messageState.message} 
                isError={messageState.isError}
                className={"absolute bottom-0"}    
            />
            </Modal>
        </>

    );
}

export default JournalForm;