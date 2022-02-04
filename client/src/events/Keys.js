export const escapeToCloseModal = (e, showNewJournal, setShowNewJournal, showSort, setShowShort) => {
    const escapeKeyCode = 27;   // shortcut for escape
    if (e.keyCode !== escapeKeyCode) return;
    if (!showNewJournal && !showSort) return;
    setShowNewJournal(false);
    setShowShort(false);
}