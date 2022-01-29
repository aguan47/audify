import axios, { createAuthorization } from "../axios/axios";
import { getKeyValueFromState } from "../utlities/helper";

export const getUserInformation = async (user, setUser, setProfile) => {
    try {
        const { data } = await axios.get("/users/", createAuthorization(user.accessToken));
        setProfile(data.user);
    } catch({ response }) {
        console.log(response.data.message);
    }
}

export const editUserInformation = async (user, setUser, setIsEdit, state) => {
    const updatedProfile = getKeyValueFromState(state);
    try {
        await axios.put('/users/', updatedProfile, createAuthorization(user.accessToken));
        setUser({...user, name: updatedProfile.name, email: updatedProfile.email});
        setIsEdit(false);
    } catch({ response }) {
        console.log(response.data.message);
    }
}