import axios, { formDataHeader } from '../axios/axios';

const createJournalData = (title, caption, audioJournal) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('journal', audioJournal.audio);
    return formData;
}

export const createJournal = async (accessToken, e, title, setTitle, caption, setCaption, audioJournal, setAudioJournal) => {
    e.preventDefault();
    const journalData = createJournalData(title, caption, audioJournal);
    try {
        const { data } = await axios.post("/journals/", journalData, formDataHeader(accessToken));
        console.log(data);
        setTitle("");
        setCaption("");
        setAudioJournal({audio: null, source: ""});
    } catch({response}) {
        console.log(response.data.message);
    }
}

export const getJournals = async(accessToken, setJournals) => {
    
}