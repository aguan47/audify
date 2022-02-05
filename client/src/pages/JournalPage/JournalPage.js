import { useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container/Container";
import JournalModal from "../../components/JournalModal/JournalModal";
import AuthNavBar from "../../components/NavBar/AuthNavBar";
import NoData from "../../components/NoData/NoData";
import { getJournals } from "../../events/Journals";
import { escapeToCloseModal } from "../../events/Keys";
import { BLUE_BUTTON, HOLLOW_BLUE_BUTTON } from "../../tailwind/tailwind";
import UserContext from '../../context/UserContext';
import JournalList from "../../components/JournalList/JournalList";
import Loader from "../../components/Loader/Loader";
import SortModal from "../../components/SortModal/SortModal";
import { BLUE } from "../../config/constants";

const JournalPage = () => {
    document.title = `Your journals | Audify`;
    
    const [showNewJournal, setShowNewJournal] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [journals, setJournals] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(false);
    const [shouldColorFilter, setShouldColorFilter] = useState(false);
    const [currentColor, setCurrentColor] = useState(BLUE);
    const { user } = useContext(UserContext);

    const allJournalsRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            getJournals(user.accessToken, setJournals, setIsLoading, allJournalsRef);
        }, 500);
    }, []);

    const escapeHandler = e => {
        if (showNewJournal) {
            escapeToCloseModal(e, setShowNewJournal);
        } else if (showSort) {
            escapeToCloseModal(e, setShowSort);
        }
    }

    return (
        <>
            <div onKeyDown={e => escapeHandler(e)} tabIndex={0}>
                <AuthNavBar/>
                <Container>
                    <div className="px-10 py-1 flex gap-x-2">
                        <button className={HOLLOW_BLUE_BUTTON} onClick={() => setShowSort(true)}>Sort journals</button>
                        <button className={BLUE_BUTTON} onClick={() => setShowNewJournal(true)}>Create new journal</button>
                    </div>
                    { isLoading && <div className="w-screen flex justify-center items-center"><Loader/></div> }
                    {
                        !isLoading && 
                        <>
                            {  journals?.length ? <JournalList userJournals={journals}/> : <NoData/> }
                        </>
                    }
                </Container>
                <JournalModal 
                    show={showNewJournal} 
                    clickHandler={() => setShowNewJournal(false)}
                    accessToken={user.accessToken}
                    journals={journals}
                    setJournals={setJournals}
                    allJournalsRef={allJournalsRef}
                    shouldColorFilter={shouldColorFilter}
                    filterColor={currentColor}
                    isAscending={isAscending}
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
            </div>
        </>
    );
}

export default JournalPage;