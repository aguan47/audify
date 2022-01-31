import axios, { createAuthorization } from "../axios/axios";
import { getKeyValueFromState } from "../utlities/helper";

export const getUserInformation = async (user, state, setProfile, setInitialState, messageState, setMessageState, setInitialProfilePicture) => {
    try {
        const { data } = await axios.get("/users/", createAuthorization(user.accessToken));
        data.user.profile_picture_path = `${process.env.REACT_APP_AXIOS_BASE_URL}/images/${data.user.profile_picture_path}`; 
        setProfile(data.user);
        setInitialState(state);
        setInitialProfilePicture(data.user.profile_picture_path);
    } catch({ response }) {
        setMessageState({...messageState, showMessage: true, message: response.data.message, isError: true});
    }
}

export const editUserInformation = async (user, setUser, state, e, messageState, setMessageState, setInitialState, setIsLoading, setInitialProfilePicture) => {
    e.preventDefault();
    const updatedProfile = getKeyValueFromState(state);
    setIsLoading(true);
    try {
        await axios.put('/users/', updatedProfile, createAuthorization(user.accessToken));
        setUser({...user, name: updatedProfile.name, email: updatedProfile.email});
        setInitialState(state);
        setInitialProfilePicture(updatedProfile.profile_picture_path);
        setMessageState({...messageState, showMessage: true, message: "Successfully updated your profile", isError: false});
    } catch({ response }) {
        setMessageState({...messageState, showMessage: true, message: response.data.message, isError: true});
    } finally {
        setIsLoading(false);
    }
}