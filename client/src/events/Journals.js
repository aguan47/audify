import { useCallback } from 'react';
import axios, { createAuthorization, formDataHeader } from '../axios/axios';
import { BLUE } from '../config/constants';

export const createJournalData = (title, caption, audioJournal, currentColor) => {
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

export const resetInputFields = (setTitle, setCaption, setAudioJournal, setCurrentColor) => {
    setTitle("");
    setCaption("");
    setAudioJournal({audio: null, source: ""});
    setCurrentColor(BLUE);
}

export const createJournal = async (accessToken, e, journalData, journals, setJournals, messageState, setMessageState, allJournalsRef, shouldColorFilter, filterColor, isAscending) => {
    e.preventDefault();
    setMessageState({message: "", showMessage: false, isError: messageState.isError});
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
        setMessageState({message: "Created new journal!", isError: false, showMessage: true});
    } catch({response}) {
        setMessageState({message: response.data.message, isError: true, showMessage: true});
    }
}

export const editJournal = async(e, accessToken, journalID, journalData, messageState, setMessageState, allJournalsRef, journals, setJournals) => {
    e.preventDefault();
    setMessageState({message: "", showMessage: false, isError: messageState.isError});
    try {
        const { data } = await axios.put(`/journals/${journalID}`, journalData, formDataHeader(accessToken));
        const updatedJournal = createNewJournalEntryData(data.journal);
        const modifiedAllJournals = editJournalData(allJournalsRef.current, journalID, updatedJournal);
        const modifiedOnScreenJournals = editJournalData(journals, journalID, updatedJournal);

        allJournalsRef.current = modifiedAllJournals;
        setJournals([...modifiedOnScreenJournals]);
        setMessageState({message: "Edited journal!", isError: false, showMessage: true});
    } catch({response}) {
        setMessageState({message: response.data.message, isError: true, showMessage: true});
    }
}

export const getJournals = async(accessToken, setJournals, setIsLoading, allJournalsRef) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get("/journals/", createAuthorization(accessToken));
        let modifiedJournalPaths = modifyJournalPath(data.journals);
        let ascendingJournals = sortByDate(true, modifiedJournalPaths);
        setJournals(ascendingJournals);
        allJournalsRef.current = ascendingJournals;
    } catch({response}) {
        console.log(response.data.message);
    } finally {
        setIsLoading(false);
    }
}

export const deleteJournal = async(accessToken, journalID, allJournals, journalsOnScreen, setJournals, setShowDeleteJournal) => {
    try {
        await axios.delete(`/journals/${journalID}`, createAuthorization(accessToken));

        // delete it from the allJournals
        const filteredAllJournals = filterJournalsByID(allJournals.current, journalID);
        const filteredOnScreenJournals = filterJournalsByID(journalsOnScreen, journalID);

        allJournals.current = filteredAllJournals;
        setJournals(filteredOnScreenJournals);
        setShowDeleteJournal(false);
    } catch({response}) {
        console.log(response);
    }
}

export const sortAndFilter = (shouldColorFilter, color, isAscending, journals, setJournals) => {
    if (shouldColorFilter) journals = filterJournalColors(color, journals);
    setJournals(sortByDate(isAscending, journals));
}

const filterJournalColors = (color, journals) => {
    return journals && journals.filter(journal => {
        return journal.color === color
    });
}

const filterJournalsByID = (journals, journalID) => {
    return journals && journals.filter(journal => {
        return journal.journal_id !== journalID
    });
}

const ascendingOrder = (a,b) => {
    if (a.last_modified && !b.last_modified) return a.last_modified < b.create_date ? 1 : -1; 
    if (!a.last_modified && b.last_modified) return a.create_date < b.last_modified ? 1 : -1;
    if (a.last_modified && b.last_modified) return a.last_modified < b.last_modified ? 1 : -1;
    return a.create_date < b.create_date ? 1 : -1;
}

const descendingOrder = (a,b) => {
    if (a.last_modified && !b.last_modified) return a.last_modified > b.create_date ? 1 : -1; 
    if (!a.last_modified && b.last_modified) return a.create_date > b.last_modified ? 1 : -1; 
    if (a.last_modified && b.last_modified) return a.last_modified > b.last_modified ? 1 : -1; 
    return a.create_date > b.create_date ? 1 : -1; 
}

const sortByDate = (isAscending, journals) => {
    if (isAscending) return [...journals.sort(ascendingOrder)];
    return [...journals.sort(descendingOrder)];
}

const editJournalData = (journals, journalID, updatedJournal) => {
    return journals && journals.map(journal => {
        if (journal.journal_id === journalID) return updatedJournal;
        return journal;
    });
}