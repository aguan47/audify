import axios, { createAuthorization, formDataHeader } from '../axios/axios';

const createJournalData = (title, caption, audioJournal) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('journal', audioJournal.audio);
    return formData;
}

const createNewJournalEntryData = (title, caption, audioSource) => {
    return {
        journal_id: new Date().getTime(),
        title: title,
        caption: caption,
        journal_path: audioSource,
        created_date: new Date()
    }
}

const modifyJournalPath = (journals) => {
    return journals && journals.map(journal => {
        journal.journal_path = `${process.env.REACT_APP_AXIOS_BASE_URL}/audio/${journal.journal_path}`
        return journal;
    });
}

export const createJournal = async (accessToken, e, title, setTitle, caption, setCaption, audioJournal, setAudioJournal, journals, setJournals) => {
    e.preventDefault();
    const journalData = createJournalData(title, caption, audioJournal);
    try {
        const { data } = await axios.post("/journals/", journalData, formDataHeader(accessToken));
        console.log(data);
        setTitle("");
        setCaption("");
        setAudioJournal({audio: null, source: ""});
        setJournals([...journals, createNewJournalEntryData(title, caption, audioJournal.source)]);
    } catch({response}) {
        console.log(response.data.message);
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