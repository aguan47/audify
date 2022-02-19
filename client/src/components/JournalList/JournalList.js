import { memo } from 'react';
import Journal from "./Journal/Journal";


const JournalList = ({userJournals, currentJournal, setCurrentJournal, setShowDeleteModal, setEditJournalModal}) => {
    const journals = userJournals && userJournals.map(journal => {
        return (
            <Journal 
                key={journal.journal_id} 
                title={journal.title} 
                caption={journal.caption} 
                audioSource={journal.journal_path}
                createDate={journal.create_date}
                lastModified={journal.last_modified}
                color={journal.color} 
                showOptions={journal.journal_id === currentJournal?.journal_id}
                clickHandler={() => setCurrentJournal(journal)}
                deleteHandler={setShowDeleteModal}
                editHandler={journal => setEditJournalModal(journal)}
            />
        );
    });

    return (
        <div className="w-full flex flex-col items-center my-5">
            {journals}
        </div>
    );
}

export default memo(JournalList);