import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import JournalForm from "../../components/JournalForm/JournalForm";
import AuthNavBar from "../../components/NavBar/AuthNavBar";
import { BLUE_BUTTON, HOLLOW_BLUE_BUTTON } from "../../tailwind/tailwind";

document.title = `Your journals | Audify`;
const Journals = () => {
    const [showNewJournal, setShowNewJournal] = useState(false);

    const keyDownHandler = e => {
        const escapeKeyCode = 27;   // shortcut for escape
        if (e.keyCode !== escapeKeyCode) return;
        if (!showNewJournal) return;
        setShowNewJournal(false);
    }

    return (
        <>
            <div onKeyDown={e => keyDownHandler(e)} tabIndex={0}>
                <AuthNavBar/>
                <Container>
                    <div className="px-10 py-1 flex gap-x-2">
                        <button className={HOLLOW_BLUE_BUTTON}>Sort journals by</button>
                        <button className={BLUE_BUTTON} onClick={() => setShowNewJournal(true)}>Create new journal</button>
                    </div>
                </Container>
                <JournalForm show={showNewJournal} clickHandler={() => setShowNewJournal(false)}/>
            </div>
        </>
    );
}

export default Journals;