import { useState, useEffect, useCallback, memo } from "react";
import { BIG_BLUE_BUTTON } from "../../tailwind/tailwind";
import Modal from "../Modal/Modal";
import Recorder from "../Recorder/Recorder";
import { createJournal, createJournalData, editJournal, resetInputFields } from "../../events/Journals";
import ColorBar from "../ColorBar/ColorBar";
import { BLUE, MAX_CAPTION_LENGTH, MAX_TITLE_LENGTH } from '../../config/constants';
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Toast from "../Toast/Toast";
import Loader from '../Loader/Loader';
import TitleInput from "./TitleInput/TitleInput";
import CaptionInput from "./CaptionInput/CaptionInput";

const JournalModal = ({ show, clickHandler, accessToken, journals, setJournals, 
    allJournalsRef, shouldColorFilter, filterColor, isAscending, isEdit, setIsEdit,
    currentJournal}) => {

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
    const [isLoading, setIsLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState("Create a new journal");
    
    useEffect(() => {        
        if (show) return;
        
        setTitle("");
        setAudioJournal({audio: null, source: ""});
        setCaption("");
        setCurrentColor(BLUE);
        setModalTitle("Create a new journal");
    }, [show])

    useEffect(() => {
        if (!isEdit) return;
        setIsLoading(true);
        setTitle(currentJournal.title);
        setAudioJournal({audio: null, source: currentJournal.journal_path});
        setCaption(currentJournal.caption);
        setCurrentColor(currentJournal.color);
        setModalTitle("Edit your journal");
        setIsLoading(false);
    }, [isEdit]);

    useEffect(() => {
        console.log(messageState);
        if (!messageState.isError) resetInputFields(setTitle, setCaption, setAudioJournal, setCurrentColor);
    }, [messageState]);

    const titleHandler = e => {
        if(e.target.value.length > MAX_TITLE_LENGTH) return;
        setTitle(e.target.value);
    }

    const captionHandler = e => {
        if(e.target.value.length > MAX_CAPTION_LENGTH) return;
        setCaption(e.target.value);
    }

    const createJournalHandler = useCallback(e => {
        const journalData = createJournalData(title, caption, audioJournal, currentColor);
        setIsLoading(true);
        createJournal(accessToken, e, journalData, journals, setJournals, messageState, setMessageState, 
            allJournalsRef, shouldColorFilter, filterColor, isAscending);
        
        setIsLoading(false);
    }, [title, caption, audioJournal, journals, currentColor, messageState, allJournalsRef, shouldColorFilter, filterColor]);
    
    const editJournalHandler = useCallback(e => {
        const journalData = createJournalData(title, caption, audioJournal, currentColor);
        setIsLoading(true);
        editJournal(e, accessToken, currentJournal.journal_id, journalData, messageState, 
            setMessageState, allJournalsRef, journals, setJournals, isAscending);
        
        setIsLoading(false);
        setIsEdit(false);
        clickHandler();
    }, [title, caption, audioJournal, currentColor]);



    return(
        <>
            <Modal title={modalTitle} show={show} clickHandler={clickHandler}>
                {
                    isLoading ? <Loader /> :
                    <>
                        <TitleInput title={title} titleHandler={titleHandler}/>
                        <CaptionInput caption={caption} captionHandler={captionHandler} />
                        <ColorBar currentColor={currentColor} setCurrentColor={setCurrentColor}/>
                        { audioJournal.source && <AudioPlayer source={audioJournal.source}/> }
                        <Recorder 
                            setAudioJournal={setAudioJournal}
                            shouldOutput={true}    
                        />
                        <input type="submit" value={"Save journal"} 
                            className={BIG_BLUE_BUTTON} 
                            onClick={isEdit ? editJournalHandler : createJournalHandler}/>        
                        <Toast 
                            show={messageState.showMessage} 
                            message={messageState.message} 
                            isError={messageState.isError}
                        />
                    </>
                }
            </Modal>
        </>

    );
}

const compareProps = (prev, current) => {
    return prev.show === current.show;
}

export default memo(JournalModal, compareProps);