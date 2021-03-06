import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { editProfileState, formReducer } from "../../reducer/formReducer";
import UserContext from "../../context/UserContext";
import { deleteUserProfile, editUserInformation, getUserInformation } from "../../events/Users";
import { disableInput, loadPicture, loadProfileData } from "../../utlities/helper";
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";
import Banner from "../../components/Banner/Banner";
import AuthNavBar from '../../components/NavBar/AuthNavBar';
import Container from "../../components/Container/Container";
import Loader from '../../components/Loader/Loader';
import ProfilePicture from "../../components/ProfilePicture/ProfilePIcture";
import { BLUE_BUTTON, RED_BUTTON, HOLLOW_RED_BUTTON } from "../../tailwind/tailwind";
import ProfileOptions from "./ProfileOptions/ProfileOptions";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router";
import { escapeToCloseModal } from "../../events/Keys";



const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [buttonState, setButtonState] = useState({
        buttonClass: BLUE_BUTTON,
        buttonText: "Edit Profile"
    });
    const [initialInputState, setInitialInputState] = useState(null);   // This is where we will store the state of the user information after retrieving it for the first time
    const [profilePicture, setProfilePicture] = useState({
        image: null,
        source: ""
    });
    const [initialProfilePicture, setInitialProfilePicture] = useState({
        image: null,
        source: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [messageState, setMessageState] = useState({
        showMessage: false,
        message: "",
        isError: false
    });
    const [state, dispatch] = useReducer(formReducer, editProfileState);
    const navigate = useNavigate();

    document.title = `${user.name} | Audify`;
    useEffect(() => {
        getUserInformation(user, state, setProfile, setInitialInputState, messageState, setMessageState, initialProfilePicture, setInitialProfilePicture, profilePicture, setProfilePicture);
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
            setProfilePicture({image: null, source: initialProfilePicture.source});
            setIsLoading(false);
        }, 500);
    }, [isEdit]);
    
    const editEventHandler = () => editBtnHandler(state, isEdit, setIsEdit, buttonState, setButtonState, setMessageState, messageState);
    const submitHandler = useCallback(async e => {
        await editUserInformation(e, user, setUser, state, dispatch, messageState, setMessageState, initialInputState, setInitialInputState, setIsLoading, initialProfilePicture, setInitialProfilePicture, profilePicture);
    }, [user, state, messageState, initialInputState, initialProfilePicture, profilePicture]); 
    const changePictureHandler = e => loadPicture(e, setProfilePicture);
    const deleteEventHandler = useCallback(() => {
        deleteUserProfile(user.accessToken, navigate, setUser)
    }, [user.accessToken]);
    const escapeHandler = e => escapeToCloseModal(e, setShowDeleteModal);

    return (
        <>
            <div onKeyDown={e => escapeHandler(e)} tabIndex={0}>
                <AuthNavBar/>
                <Container>
                    <div className="flex flex-col justify-center items-center">
                        <Banner message={messageState.message} show={messageState.showMessage} isError={messageState.isError} />
                        <ProfileOptions buttonState={buttonState} editEventHandler={editEventHandler} deleteEventHandler={() => setShowDeleteModal(true)} />
                        {
                            isLoading ? <Loader/> :
                            <>
                                <ProfilePicture isEdit={isEdit} profilePicture={profilePicture.source} changePictureHandler={changePictureHandler}/>
                                <Forms fields={state} submitText={"Save changes"} dispatch={dispatch} submit={submitHandler} canSubmit={isEdit}/>
                            </>
                        }
                    </div>
                </Container>
                <ConfirmationModal 
                    show={showDeleteModal} 
                    clickHandler={() => setShowDeleteModal(false)} 
                    body={"Are you sure you want to to delete your account? You will lose all of your journals."}
                    disagreeBtnStyle={HOLLOW_RED_BUTTON}
                    agreeBtnStyle={RED_BUTTON}
                    agreeBtnText={"Yes, delete my account"}
                    disagreeHandler={() => setShowDeleteModal(false)}
                    agreeHandler={deleteEventHandler}
                />
            </div>
        </>
    );
}

const editBtnHandler = (state,isEdit, setIsEdit, buttonState, setButtonState, setMessageState, messageState) => {
    setIsEdit(!isEdit);
    if (!isEdit) {
        setButtonState({...buttonState, buttonClass: RED_BUTTON, buttonText: "Don't save changes"});
        setMessageState({...messageState, showMessage: false, message: "", isError: false});
    } else {
        setButtonState({...buttonState, buttonClass: BLUE_BUTTON, buttonText: "Edit Profile"});
    }
    disableInput(state, isEdit);
}

export default Profile;