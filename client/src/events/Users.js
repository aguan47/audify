import axios, { createAuthorization } from "../axios/axios";
import { getKeyValueFromState } from "../utlities/helper";

export const getUserInformation = async (user, setUser, setProfile) => {
    try {
        const { data } = await axios.get("/users/", createAuthorization(user.accessToken));
        data.user.profile_picture_path = `${process.env.REACT_APP_AXIOS_BASE_URL}/images/${data.user.profile_picture_path}`; 
        setProfile(data.user);
    } catch({ response }) {
        console.log(response.data.message);
    }
}

export const editUserInformation = async (user, setUser, state, e, messageState, setMessageState) => {
    e.preventDefault();
    const updatedProfile = getKeyValueFromState(state);
    try {
        await axios.put('/users/', updatedProfile, createAuthorization(user.accessToken));
        setUser({...user, name: updatedProfile.name, email: updatedProfile.email});
        setMessageState({...messageState, showMessage: true, message: "Successfully updated your profile", isError: false});
    } catch({ response }) {
        console.log(response.data.message);
        setMessageState({...messageState, showMessage: true, message: response.data.message, isError: true});
    }
}