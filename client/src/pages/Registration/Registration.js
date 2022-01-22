import { useEffect, useReducer } from "react";
import Forms from "../../components/Forms/Forms";
import { registrationState, formReducer } from "../../reducer/formReducer";
import { getKeyValueFromState, importKeyValueLocalStorage, clearKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import axios from 'axios';
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";

const pageName = "registration";
const Registration = () => {
    document.title = "Register now at Audify";

    const [regState, dispatch] = useReducer(formReducer, registrationState);

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(registrationState, pageName)});
    }, []);

    useEffect(() => {
        saveKeyValueToLocalStorage(regState, pageName, ["password"]);
    }, [regState]);

    const registerUser = e => {
        e.preventDefault();
        const userInfo = getKeyValueFromState(regState);
        console.log(userInfo);
        clearKeyValueLocalStorage(regState, pageName);
    }

    return (
        <>
            <Forms fields={regState} submitText={"Register now"} dispatch={dispatch} submit={registerUser}/>
            <h3>Or you can join us by</h3>
            <button className="rounded-full px-5 py-2 bg-blue-400 hover:bg-blue-600">Google</button>
        </>
    );
}

export default Registration;