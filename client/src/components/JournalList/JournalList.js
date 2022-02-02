import Journal from "./Journal/Journal";

const JournalList = ({userJournals}) => {
    const journals = userJournals && userJournals.map(journal => {
        return (
            <Journal 
            key={journal.journal_id} 
            title={journal.title} 
            caption={journal.caption} 
            audioSource={journal.journal_path}
            createDate={journal.create_date} />
        );
    });

    return (
        <div className="w-screen flex flex-col items-center m-5">
            {journals}
        </div>
    );
}

export default JournalList;