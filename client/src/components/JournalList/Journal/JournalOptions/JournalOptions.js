const JournalOptions = ({deleteJournalHandler, editJournalHandler}) => {
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
        </div>
    );
}

export default JournalOptions;