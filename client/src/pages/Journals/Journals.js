import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import JournalForm from "../../components/JournalForm/JournalForm";
import AuthNavBar from "../../components/NavBar/AuthNavBar";

document.title = `Your journals | Audify`;
const Journals = () => {
    return (
        <Container>
            <AuthNavBar/>
            <div className="w-full flex flex-col items-center">
                <JournalForm/>
            </div>
        </Container>
    );
}

export default Journals;