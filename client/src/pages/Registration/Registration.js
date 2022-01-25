import { useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Forms from "../../components/Forms/Forms";
import { registrationState, formReducer } from "../../reducer/formReducer";
import { getKeyValueFromState, importKeyValueLocalStorage, clearKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import axios from '../../axios/axios';
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';

const pageName = "registration";
const Registration = () => {
    document.title = "Register now at Audify";

    const [regState, dispatch] = useReducer(formReducer, registrationState);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(registrationState, pageName)});
    }, []);

    useEffect(() => {
        saveKeyValueToLocalStorage(regState, pageName, ["password"]);
    }, [regState]);

    const registerUser = async e => {
        e.preventDefault();
        const userInfo = getKeyValueFromState(regState);
        
        try {
            const { tokens } = await axios.post('/users/register', userInfo);

            // store the access and refresh tokens 
            document.cookie = `access_token=${tokens.accessToken}; SameSite=Lax`;
            document.cookie = `refresh_token=${tokens.refreshToken}; SameSite=Lax`;

            navigate('/journals', {replace: true});

        } catch({ response }) {
            setError(response.data.message);
            setShowError(true);
        }
        
        clearKeyValueLocalStorage(regState, pageName);
    }

    return (
        <>
            <ErrorBanner message={error} show={showError}/>
            <Forms fields={regState} submitText={"Register now"} dispatch={dispatch} submit={registerUser} canSubmit={true} />
            <h3>Or you can join us by</h3>
            <button className="rounded-full px-5 py-2 bg-blue-400 hover:bg-blue-600">Google</button>
        </>
    );
}

export default Registration;