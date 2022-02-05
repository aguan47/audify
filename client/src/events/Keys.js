export const escapeToCloseModal = (e, setShowModal) => {
    const escapeKeyCode = 27;   // shortcut for escape
    if (e.keyCode !== escapeKeyCode) return;
    setShowModal(false);
}