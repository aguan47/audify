import { useContext, useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { editProfileState, formReducer } from "../../reducer/formReducer";
import UserContext from "../../context/UserContext";
import { editUserInformation, getUserInformation } from "../../events/Users";
import { disableInput, loadProfileData } from "../../utlities/helper";
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";
import Banner from "../../components/Banner/Banner";
import AuthNavBar from '../../components/NavBar/AuthNavBar';
import Container from "../../components/Container/Container";
import FileUpload from "../../components/FileUpload/FileUpload";
import { motion } from "framer-motion";


const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [buttonState, setButtonState] = useState({
        buttonClass: "rounded-full bg-primary-btn py-1 px-5 text-white ml-10 hover:bg-secondary-btn transition font-bold",
        buttonText: "Edit Profile"
    });
    const [messageState, setMessageState] = useState({
        showMessage: false,
        setMessageState: "",
        isError: false
    });
    const [state, dispatch] = useReducer(formReducer, editProfileState);

    document.title = `${user.name} | Audify`;
    useEffect(() => {
        getUserInformation(user, setUser, setProfile);
        return () => disableInput(state, true);
    }, []);

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: loadProfileData(state, profile)});
    }, [profile]);

    return (
        <Container>
            <AuthNavBar/>
            <div className="flex flex-col justify-center items-center">
                <Banner message={messageState.message} show={messageState.showMessage} isError={messageState.isError} />
                <div className="flex justify-between w-screen">
                    <button className={buttonState.buttonClass} onClick={() => editBtnHandler(state, isEdit, setIsEdit, buttonState, setButtonState)}>{buttonState.buttonText}</button> 
                    <br /><br />
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <img src={profile?.profile_picture_path} alt={"User portrait"} className="rounded-full max-w-standard h-auto m-5"/>
                    { isEdit && <FileUpload/> }
                </div>
                <Forms fields={state} submitText={"Save changes"} dispatch={dispatch} submit={e => editUserInformation(user, setUser, state, e, messageState, setMessageState)} canSubmit={isEdit}/>
            </div>
        </Container>
    );
}

const editBtnHandler = (state,isEdit, setIsEdit, buttonState, setButtonState) => {
    setIsEdit(!isEdit);
    if (!isEdit) {
        setButtonState({...buttonState, buttonClass: "rounded-full bg-red-500 py-1 px-5 text-white ml-10 hover:bg-red-600 transition font-bold", buttonText: "Don't save changes"});
    } else {
        setButtonState({...buttonState, buttonClass: "rounded-full bg-primary-btn py-1 px-5 text-white ml-10 hover:bg-secondary-btn transition font-bold", buttonText: "Edit Profile"});
    }
    disableInput(state, isEdit);
}

export default Profile;