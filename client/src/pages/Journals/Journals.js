import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import JournalForm from "../../components/JournalForm/JournalForm";
import AuthNavBar from "../../components/NavBar/AuthNavBar";

document.title = `Your journals | Audify`;
const Journals = () => {
    const [showNewJournal, setShowNewJournal] = useState(false);

    return (
        <Container>
            <AuthNavBar/>
            <div className="px-0 py-2">
                <button className="rounded-full border-2 border-primary-btn py-1 px-5 text-primary-btn ml-10 hover:bg-secondary-btn hover:text-white transition font-bold">Sort journals by</button>
                <button className="rounded-full bg-primary-btn py-1 px-5 text-white ml-5 hover:bg-secondary-btn transition font-bold" onClick={() => setShowNewJournal(true)}>Create new journal</button>
            </div>

            <JournalForm show={showNewJournal} clickHandler={() => setShowNewJournal(false)}/>
        </Container>
    );
}

export default Journals;