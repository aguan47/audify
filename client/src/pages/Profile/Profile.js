import { useContext, useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { editProfileState, formReducer } from "../../reducer/formReducer";
import UserContext from "../../context/UserContext";
import { editUserInformation, getUserInformation } from "../../events/Users";
import { disableInput, loadProfileData } from "../../utlities/helper";
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";

const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [buttonState, setButtonState] = useState({
        buttonClass: "bg-blue-400 px-3 py-2 text-white",
        buttonText: "Edit Profile"
    });
    const [state, dispatch] = useReducer(formReducer, editProfileState);

    document.title = `${user.name} | Audify`;
    useEffect(() => {
        getUserInformation(user, setUser, setProfile);
    }, []);

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: loadProfileData(state, profile)});
    }, [profile]);

    return (
        <>
            <img src={profilePicture} alt={"User portrait"}/>
            { isEdit && <input type="file" accept="image/*"/> }
            <button className={buttonState.buttonClass} onClick={() => editBtnHandler(state, isEdit, setIsEdit, buttonState, setButtonState)}>{buttonState.buttonText}</button> 
            <Forms fields={state} submitText={"Save changes"} dispatch={dispatch} submit={() => editUserInformation(user, setUser, setIsEdit, state)} canSubmit={isEdit}/>
        </>
    );
}

const editBtnHandler = (state,isEdit, setIsEdit, buttonState, setButtonState) => {
    setIsEdit(!isEdit);
    if (!isEdit) {
        setButtonState({...buttonState, buttonClass: "bg-red-400 px-3 py-2 text-white", buttonText: "Don't save changes"});
    } else {
        setButtonState({...buttonState, buttonClass: "bg-blue-400 px-3 py-2 text-white", buttonText: "Edit Profile"});
    }
    disableInput(state, isEdit);
}

export default Profile;