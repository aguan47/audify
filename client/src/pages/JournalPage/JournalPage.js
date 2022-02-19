import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container/Container";
import JournalModal from "../../components/JournalModal/JournalModal";
import AuthNavBar from "../../components/NavBar/AuthNavBar";
import NoData from "../../components/NoData/NoData";
import { deleteJournal, getJournals } from "../../events/Journals";
import { escapeToCloseModal } from "../../events/Keys";
import { BLUE_BUTTON, HOLLOW_BLUE_BUTTON, HOLLOW_RED_BUTTON, RED_BUTTON } from "../../tailwind/tailwind";
import UserContext from '../../context/UserContext';
import JournalList from "../../components/JournalList/JournalList";
import Loader from "../../components/Loader/Loader";
import SortModal from "../../components/SortModal/SortModal";
import { BLUE } from "../../config/constants";
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const JournalPage = () => {
    document.title = `Your journals | Audify`;
    
    const [showJournalForm, setShowJournalForm] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showDeleteJournal, setShowDeleteJournal] = useState(false);
    const [journals, setJournals] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    const [shouldColorFilter, setShouldColorFilter] = useState(false);
    const [currentColor, setCurrentColor] = useState(BLUE);
    const [currentJournal, setCurrentJournal] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useContext(UserContext);
    
    const allJournalsRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) getJournals(user.accessToken, setJournals, setIsLoading, allJournalsRef);
        return () => isMounted = false;
    }, []);

    const escapeHandler = useCallback(e => {
        const escapeKeyCode = 27;   // shortcut for escape
        if (showJournalForm) {
            escapeToCloseModal(e, setShowJournalForm);
            if (isEdit && e.keyCode === escapeKeyCode) {
                setIsEdit(false);
                setCurrentJournal(null);
            }
        } else if (showSort) {
            escapeToCloseModal(e, setShowSort);
        } else if (showDeleteJournal) {
            escapeToCloseModal(e, setShowDeleteJournal);
        }
    }, [showJournalForm, showSort, showDeleteJournal]);

    const deleteJournalHandler = useCallback(() => {
        deleteJournal(user.accessToken, currentJournal.journal_id, allJournalsRef, journals, setJournals, setShowDeleteJournal)
        setCurrentJournal(null);
    }, [user.accessToken, currentJournal, allJournalsRef, journals, setJournals, setShowDeleteJournal]);
    const editJournalHandler = useCallback(selectedJournal => {
        setShowJournalForm(true);
        setIsEdit(true);
        setCurrentJournal(selectedJournal);
    }, []);

    const showNewJournalHandler = () => setShowJournalForm(false);
    const showEditJournalHandler = () => {
        setShowJournalForm(false);
        setIsEdit(false);
        setCurrentJournal(null);
    }

    return (
        <>
            <div onKeyDown={e => escapeHandler(e)} tabIndex={0}>
                <AuthNavBar/>
                <Container>
                    <div className="px-10 py-1 flex gap-x-2">
                        <button className={HOLLOW_BLUE_BUTTON} onClick={() => setShowSort(true)}>Sort journals</button>
                        <button className={BLUE_BUTTON} onClick={() => setShowJournalForm(true)}>Create new journal</button>
                    </div>
                    { isLoading && <div className="w-screen flex justify-center items-center"><Loader/></div> }
                    {
                        !isLoading && 
                        <>
                            {  journals?.length ? 
                                <JournalList 
                                    userJournals={journals}
                                    currentJournal={currentJournal}
                                    setCurrentJournal={setCurrentJournal}
                                    setShowDeleteModal={() => setShowDeleteJournal(true)}
                                    setEditJournalModal={editJournalHandler}
                                /> : 
                                <NoData/> }
                        </>
                    }
                </Container>
                <JournalModal 
                    show={showJournalForm} 
                    clickHandler={isEdit ? showEditJournalHandler : showNewJournalHandler}
                    accessToken={user.accessToken}
                    journals={journals}
                    setJournals={setJournals}
                    allJournalsRef={allJournalsRef}
                    shouldColorFilter={shouldColorFilter}
                    filterColor={currentColor}
                    isAscending={isAscending}
                    currentJournal={currentJournal}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                />
                <SortModal 
                    show={showSort} 
                    clickHandler={() => setShowSort(false)} 
                    journals={allJournalsRef.current}
                    setJournals={setJournals}
                    isAscending={isAscending}
                    setIsAscending={setIsAscending}
                    shouldColorFilter={shouldColorFilter}
                    setShouldColorFilter={setShouldColorFilter}
                    currentColor={currentColor}
                    setCurrentColor={setCurrentColor}
                />
                <ConfirmationModal
                    show={showDeleteJournal}
                    clickHandler={() => setShowDeleteJournal(false)}
                    body={"Do you wish this journal? You can no longer retrieve deleted journals."}
                    agreeBtnText={"Yes, delete this journal"}
                    disagreeBtnStyle={HOLLOW_RED_BUTTON}
                    agreeBtnStyle={RED_BUTTON}
                    disagreeHandler={() => setShowDeleteJournal(false)}
                    agreeHandler={deleteJournalHandler}
                />
            </div>
        </>
    );
}

export default JournalPage;