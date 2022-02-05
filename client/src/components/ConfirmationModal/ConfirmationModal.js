import Modal from '../../components/Modal/Modal';

const ConfirmationModal = ({show, clickHandler, 
        title, body, 
        disagreeBtnText, agreeBtnText,
        disagreeBtnStyle, agreeBtnStyle,
        disagreeHandler, agreeHandler }) => {
    return (
        <Modal show={show} clickHandler={clickHandler} title={title}>
            <p className='mx-2 font-bold text-gray-500'>{body}</p>
            <div className='flex items-center justify-center gap-x-5 m-3'>
                <button className={disagreeBtnStyle} onClick={disagreeHandler}>{disagreeBtnText || "No"}</button>
                <button className={agreeBtnStyle}  onClick={agreeHandler} >{agreeBtnText || "Yes"}</button>
            </div>
        </Modal>
    ); 
}

export default ConfirmationModal;