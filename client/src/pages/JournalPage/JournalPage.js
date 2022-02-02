import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import JournalForm from "../../components/JournalForm/JournalForm";
import AuthNavBar from "../../components/NavBar/AuthNavBar";
import NoData from "../../components/NoData/NoData";
import { getJournals } from "../../events/Journals";
import { escapeToCloseModal } from "../../events/Keys";
import { BLUE_BUTTON, HOLLOW_BLUE_BUTTON } from "../../tailwind/tailwind";
import UserContext from '../../context/UserContext';
import JournalList from "../../components/JournalList/JournalList";
import Loader from "../../components/Loader/Loader";



const JournalPage = () => {
    document.title = `Your journals | Audify`;
    
    const [showNewJournal, setShowNewJournal] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [journals, setJournals] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        setTimeout(() => {
            getJournals(user.accessToken, setJournals, setIsLoading);
        }, 500);
    }, []);

    const escapeHandler = e => escapeToCloseModal(e, showNewJournal, setShowNewJournal);
    console.log(journals);
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
                <JournalForm 
                    show={showNewJournal} 
                    clickHandler={() => setShowNewJournal(false)}
                    accessToken={user.accessToken}
                    journals={journals}
                    setJournals={setJournals}
                />
            </div>
        </>
    );
}

export default JournalPage;