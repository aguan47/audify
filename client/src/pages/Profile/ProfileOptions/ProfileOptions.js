import { RED_BUTTON } from "../../../tailwind/tailwind";

const ProfileOptions = ({buttonState, editEventHandler, deleteEventHandler}) => {
    return (
        <div className="flex justify-between mr-auto gap-x-2 ml-10">
            <button className={buttonState.buttonClass} onClick={editEventHandler}>{buttonState.buttonText}</button> 
            <button className={RED_BUTTON} onClick={deleteEventHandler}>Delete your account</button>
        </div>
    )
}

export default ProfileOptions;