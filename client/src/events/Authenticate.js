import { clearKeyValueLocalStorage, deleteCookie, getKeyValueFromState, searchCookie, storeCookie } from '../utlities/helper';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../config/constants";
import axios, { createAuthorization } from "../axios/axios";

const storeAuthCookies = (tokens) => {
    storeCookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, tokens.accessTokenLifespan);
    storeCookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, tokens.refreshTokenLifespan);
}

export const getAuthStateAndProps = (errorState, setErrorState, state, user, setUser, navigate, pageName, apiPath) =>  eventHandler => async e => eventHandler(e, errorState, setErrorState, state, user, setUser, navigate, pageName, apiPath);

export const authenticateUser = async (e, errorState, setErrorState, state, user, setUser, navigate, pageName, apiPath) => {
    e.preventDefault();
    setErrorState({...errorState, isError: false, message: ""});
    const loginInfo = getKeyValueFromState(state);

    try {
        const { data } = await axios.post(apiPath, loginInfo);
        let { tokens } = data;

        // store the cookie
        storeAuthCookies(tokens);

        setUser({...user, name: data.name, isAuth: true, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
        navigate('/journals', { replace: true });
    } catch({ response }) {
        setErrorState({...errorState, isError: true, message: response?.data?.message});
    }   
    clearKeyValueLocalStorage(state, pageName);
}

export const initialAuthenticate = async (user, setUser) => {
    const accessToken = searchCookie(ACCESS_TOKEN_COOKIE);
    const refreshToken = searchCookie(REFRESH_TOKEN_COOKIE);

    if (!accessToken || !refreshToken) return;

    try {
        const { data } = await axios.post('/users/validate_token', null, createAuthorization(accessToken));
        setUser({...user, name: data.user.user_name, isAuth: true, accessToken: accessToken, refreshToken: refreshToken});
    } catch(err) {}
}

export const logoutUser = async (user, setUser, navigate) => {
    try {
        await axios.delete('/users/logout', createAuthorization(user.accessToken));
        deleteCookie(ACCESS_TOKEN_COOKIE);
        deleteCookie(REFRESH_TOKEN_COOKIE);
        setUser({...user, name: "", isAuth: false, accessToken: "", refreshToken: ""});
    } catch(err) {
        navigate('/journals', {replace: true});        
    }
}