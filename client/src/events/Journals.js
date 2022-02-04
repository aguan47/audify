import axios, { createAuthorization, formDataHeader } from '../axios/axios';
import { BLUE } from '../config/constants';

const createJournalData = (title, caption, audioJournal, currentColor) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('journal', audioJournal.audio);
    formData.append('color', currentColor);
    return formData;
}

const createNewJournalEntryData = (journal) => {
    return {...journal, journal_path:`${process.env.REACT_APP_AXIOS_BASE_URL}/audio/${journal.journal_path}`};
}

const modifyJournalPath = (journals) => {
    return journals && journals.map(journal => {
        return createNewJournalEntryData(journal);
    });
}

export const createJournal = async (accessToken, e, title, setTitle, caption, setCaption, audioJournal, setAudioJournal, journals, setJournals, currentColor, setCurrentColor, messageState, setMessageState) => {
    e.preventDefault();
    const journalData = createJournalData(title, caption, audioJournal, currentColor);
    setMessageState({message: "", showMessage: false, isError: messageState.isError});
    try {
        const { data } = await axios.post("/journals/", journalData, formDataHeader(accessToken));
        setTitle("");
        setCaption("");
        setAudioJournal({audio: null, source: ""});
        setCurrentColor(BLUE);
        setJournals([...journals, createNewJournalEntryData(data.journal)]);
        setMessageState({message: "Created new journal!", isError: false, showMessage: true});
    } catch({response}) {
        setMessageState({message: response.data.message, isError: true, showMessage: true});
    }
}

export const getJournals = async(accessToken, setJournals, setIsLoading) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get("/journals/", createAuthorization(accessToken));
        setJournals(modifyJournalPath(data.journals));
    } catch({response}) {
        console.log(response.data.message);
    } finally {
        setIsLoading(false);
    }
}