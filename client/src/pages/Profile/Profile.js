import { useContext, useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { editProfileState, formReducer } from "../../reducer/formReducer";
import UserContext from "../../context/UserContext";
import { editUserInformation, getUserInformation } from "../../events/Users";
import { disableInput, loadPicture, loadProfileData } from "../../utlities/helper";
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";
import Banner from "../../components/Banner/Banner";
import AuthNavBar from '../../components/NavBar/AuthNavBar';
import Container from "../../components/Container/Container";
import Loader from '../../components/Loader/Loader';
import ProfilePicture from "../../components/ProfilePicture/ProfilePIcture";
import { BLUE_BUTTON, RED_BUTTON } from "../../tailwind/tailwind";

const EditButton = ({buttonState, editEventHandler}) => {
    return (
        <div className="flex justify-between w-screen ml-20">
            <button className={buttonState.buttonClass} onClick={editEventHandler}>{buttonState.buttonText}</button> 
            <br /><br />
        </div>
    )
}

const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [buttonState, setButtonState] = useState({
        buttonClass: BLUE_BUTTON,
        buttonText: "Edit Profile"
    });
    const [initialInputState, setinitialInputState] = useState(null);   // This is where we will store the state of the user information after retrieving it for the first time
    const [initialProfilePicture, setInitialProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [messageState, setMessageState] = useState({
        showMessage: false,
        setMessageState: "",
        isError: false
    });
    const [state, dispatch] = useReducer(formReducer, editProfileState);

    document.title = `${user.name} | Audify`;
    useEffect(() => {
        getUserInformation(user, state, setProfile, setinitialInputState, messageState, setMessageState, setInitialProfilePicture);
        return () => disableInput(state, true);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        dispatch({type: FULL_UPDATE_STATE, newState: loadProfileData(state, profile)});
        setIsLoading(false);
    }, [profile]);

    useEffect(() => {
        if (isEdit || !initialInputState) return;
        setIsLoading(true);
        setTimeout(() => {
            disableInput(initialInputState, true);
            dispatch({type: FULL_UPDATE_STATE, newState: initialInputState});
            setProfile({...profile, profile_picture_path: initialProfilePicture});
            setIsLoading(false);
        }, 500);
    }, [isEdit]);

    const editEventHandler = () => editBtnHandler(state, isEdit, setIsEdit, buttonState, setButtonState);
    const submitHandler = e => editUserInformation(user, setUser, state, e, messageState, setMessageState, setinitialInputState, setIsLoading, setInitialProfilePicture);
    const changePictureHandler = e => loadPicture(e, profile, setProfile);

    return (
        <>
            <AuthNavBar/>
            <Container>
                <div className="flex flex-col justify-center items-center">
                    <Banner message={messageState.message} show={messageState.showMessage} isError={messageState.isError} />
                    <EditButton buttonState={buttonState} editEventHandler={editEventHandler} />
                    {
                        isLoading ? <Loader/> :
                        <>
                            <ProfilePicture isEdit={isEdit} profilePicture={profile?.profile_picture_path} changePictureHandler={changePictureHandler}/>
                            <Forms fields={state} submitText={"Save changes"} dispatch={dispatch} submit={submitHandler} canSubmit={isEdit}/>
                        </>
                    }
                </div>
            </Container>
        </>
    );
}

const editBtnHandler = (state,isEdit, setIsEdit, buttonState, setButtonState) => {
    setIsEdit(!isEdit);
    if (!isEdit) {
        setButtonState({...buttonState, buttonClass: RED_BUTTON, buttonText: "Don't save changes"});
    } else {
        setButtonState({...buttonState, buttonClass: BLUE_BUTTON, buttonText: "Edit Profile"});
    }
    disableInput(state, isEdit);
}

export default Profile;