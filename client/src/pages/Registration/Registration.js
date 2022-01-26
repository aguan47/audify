import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Forms from "../../components/Forms/Forms";
import { registrationState, formReducer } from "../../reducer/formReducer";
import { importKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import axios from '../../axios/axios';
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import UserContext from "../../context/UserContext";
import { authenticateUser, getAuthStateAndProps } from "../../events/Authenticate";

const apiPath = '/users/register';
const pageName = "registration";
document.title = "Register now at Audify";
const Registration = () => {

    const [regState, dispatch] = useReducer(formReducer, registrationState);
    const [errorState, setErrorState] = useState({
        isError: false,
        message: ""
    });
    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(registrationState, pageName)});
    }, []);

    useEffect(() => {
        saveKeyValueToLocalStorage(regState, pageName, ["password"]);
    }, [regState]);

    const registerUser = getAuthStateAndProps(errorState, setErrorState, regState, user, setUser, navigate, pageName, apiPath)(authenticateUser);

    return (
        <>
            <ErrorBanner message={errorState.message} show={errorState.isError}/>
            <Forms fields={regState} submitText={"Register now"} dispatch={dispatch} submit={registerUser} canSubmit={true} />
            <h3>Or you can join us by</h3>
            <button className="rounded-full px-5 py-2 bg-blue-400 hover:bg-blue-600">Google</button>
        </>
    );
}

export default Registration;