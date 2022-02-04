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

const resetInputFields = (setTitle, setCaption, setAudioJournal, setCurrentColor, setMessageState) => {
    setTitle("");
    setCaption("");
    setAudioJournal({audio: null, source: ""});
    setCurrentColor(BLUE);
    setMessageState({message: "Created new journal!", isError: false, showMessage: true});
}

export const createJournal = async (accessToken, e, title, setTitle, caption, setCaption, audioJournal, setAudioJournal, journals, setJournals, currentColor, setCurrentColor, messageState, setMessageState, setIsLoading, allJournalsRef, shouldColorFilter, filterColor, isAscending) => {
    e.preventDefault();
    const journalData = createJournalData(title, caption, audioJournal, currentColor);
    setMessageState({message: "", showMessage: false, isError: messageState.isError});
    setIsLoading(true);
    try {
        const { data } = await axios.post("/journals/", journalData, formDataHeader(accessToken));
        const newJournal = createNewJournalEntryData(data.journal);
        
        if ((shouldColorFilter && newJournal.color === filterColor) || !shouldColorFilter) {
            if (isAscending) {
                setJournals([newJournal, ...journals]);
            } else {
                setJournals([...journals, newJournal]);
            }
        }
        allJournalsRef.current = [...allJournalsRef.current, newJournal];

        resetInputFields(setTitle, setCaption, setAudioJournal, setCurrentColor, setMessageState);
    } catch({response}) {
        setMessageState({message: response.data.message, isError: true, showMessage: true});
    } finally {
        setIsLoading(false);
    }
}

export const getJournals = async(accessToken, setJournals, setIsLoading, allJournalsRef) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get("/journals/", createAuthorization(accessToken));
        let modifiedJournalPaths = modifyJournalPath(data.journals);
        setJournals(modifiedJournalPaths);
        allJournalsRef.current = modifiedJournalPaths;
    } catch({response}) {
        console.log(response.data.message);
    } finally {
        setIsLoading(false);
    }
}

const filterJournalColors = (color, journals) => {
    return journals && journals.filter(journal => {
        return journal.color === color
    });
}

const ascendingOrder = (a,b) => {
    return a.create_date < b.create_date
}

const descendingOrder = (a,b) => {
    return a.create_date > b.create_date
}

const sortByDate = (isAscending, journals) => {
    if (isAscending) return [...journals.sort(ascendingOrder)];
    return [...journals.sort(descendingOrder)];
}

export const sortAndFilter = (shouldColorFilter, color, isAscending, journals, setJournals) => {
    if (shouldColorFilter) journals = filterJournalColors(color, journals);
    setJournals(sortByDate(isAscending, journals));
}