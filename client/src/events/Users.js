import axios, { createAuthorization, formDataHeader } from "../axios/axios";
import { getKeyValueFromState } from "../utlities/helper";

const getUserData = async (accessToken, state, setProfile, setInitialInputState) => {       // Get user information such as their birthday, name (all except profile picture)
    let { data } = await axios.get("/users/", createAuthorization(accessToken));
    setProfile(data.user);
    setInitialInputState(state);
}

const getUserProfilePicture = async(accessToken, setProfilePicture, setInitialProfilePicture) => {
    let { data } = await axios.get("/users/profile_picture", createAuthorization(accessToken));
    data.user.profile_picture_path = `${process.env.REACT_APP_AXIOS_BASE_URL}/images/${data.user.profile_picture_path}`; 
    setProfilePicture({image: null, source: data.user.profile_picture_path});
    setInitialProfilePicture({image: null, source: data.user.profile_picture_path});
}

export const getUserInformation = async (user, state, setProfile, setInitialInputState, messageState, setMessageState, initialProfilePicture, setInitialProfilePicture, profilePicture, setProfilePicture) => {
    try {
        await getUserData(user.accessToken, state, setProfile, setInitialInputState, setProfilePicture, setInitialProfilePicture);
        await getUserProfilePicture(user.accessToken, setProfilePicture, setInitialProfilePicture);
    } catch({ response }) {
        setMessageState({...messageState, showMessage: true, message: response.data.message, isError: true});
    }
}

export const editUserInformation = async (e, user, setUser, state, profile, messageState, setMessageState, setInitialInputState, setIsLoading, initialProfilePicture, setInitialProfilePicture, profilePicture) => {
    e.preventDefault();
    const updatedProfile = getKeyValueFromState(state);
    setIsLoading(true);
    try {
        await axios.put('/users/', updatedProfile, createAuthorization(user.accessToken));
        await editProfilePicture(user.accessToken, profilePicture, initialProfilePicture);
        
        setUser({...user, name: updatedProfile.name, email: updatedProfile.email});
        setInitialInputState(state);
        setInitialProfilePicture({image: profilePicture.image, source: profilePicture.source});
        setMessageState({...messageState, showMessage: true, message: "Successfully updated your profile", isError: false});
    } catch({ response }) {
        setMessageState({...messageState, showMessage: true, message: response.data.message, isError: true});
    } finally {
        setIsLoading(false);
    }
}

const editProfilePicture = async (accessToken, profilePicture, initialProfilePicture) => {
    if (profilePicture.source === initialProfilePicture.source) return;  //No changes in the profile picture
    const profilePictureData = new FormData();
    profilePictureData.append('profilePicture', profilePicture.image);
    await axios.put('/users/profile_picture', profilePictureData, formDataHeader(accessToken));    
}