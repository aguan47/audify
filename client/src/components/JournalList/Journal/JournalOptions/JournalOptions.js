const JournalOptions = ({deleteJournalHandler, editJournalHandler, journalLink}) => {
    return (
        <div className="mx-2 p-3 flex gap-x-5">
            <button className="flex items-center" onClick={editJournalHandler}>
                <span className="material-icons">edit</span>
                Edit journal
            </button>
            <button className="flex items-center" onClick={deleteJournalHandler}>
                <span className="material-icons">delete</span>
                Delete journal
            </button>
            <a download href={journalLink}>
                <button className="flex items-center">
                    <span className="material-icons">file_download</span>
                    Download
                </button>
            </a>
        </div>
    );
}

export default JournalOptions;