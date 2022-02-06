const JournalOptions = () => {
    return (
        <div className="mx-2 p-3 flex gap-x-5">
            <button className="flex items-center">
                <span class="material-icons">edit</span>
                Edit journal
            </button>
            <button className="flex items-center">
                <span class="material-icons">delete</span>
                Delete journal
            </button>
        </div>
    );
}

export default JournalOptions;