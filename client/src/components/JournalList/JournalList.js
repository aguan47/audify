import Journal from "./Journal/Journal";

const JournalList = ({userJournals}) => {
    const journals = userJournals && userJournals.map(journal => {
        return (
            <Journal 
            key={journal.journal_id} 
            title={journal.title} 
            caption={journal.caption} 
            audioSource={journal.journal_path}
            createDate={journal.create_date}
            color={journal.color} />
        );
    });

    return (
        <div className="w-full flex flex-col items-center my-5">
            {journals}
        </div>
    );
}

export default JournalList;