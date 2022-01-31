export const escapeToCloseModal = (e, showNewJournal, setShowNewJournal) => {
    const escapeKeyCode = 27;   // shortcut for escape
    if (e.keyCode !== escapeKeyCode) return;
    if (!showNewJournal) return;
    setShowNewJournal(false);
}