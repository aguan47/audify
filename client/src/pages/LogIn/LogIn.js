import { useEffect, useReducer } from "react";
import Forms from "../../components/Forms/Forms";
import { formReducer, loginState } from "../../reducer/formReducer";
import { clearKeyValueLocalStorage, getKeyValueFromState, importKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import { FULL_UPDATE_STATE } from '../../reducer/actions/formActions';
import axios from "../../axios/axios";
import { useNavigate } from 'react-router-dom';

const pageName = "login";
const LogIn = () => {
    document.title = "Log in at Audify";

    const [state, dispatch] = useReducer(formReducer, loginState);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(loginState, pageName)});
    }, []);
    

    useEffect(() => {
        saveKeyValueToLocalStorage(state, pageName, ["password"]);
    }, [state]);


    const loginUser = async e => {
        e.preventDefault();
        const loginInfo = getKeyValueFromState(state);

        try {
            const res = await axios.post('/users/login', loginInfo);
            
            navigate('/journals', { replace: true });
        } catch({ response }) {
            console.log(response.data.message);
        }   

        // if successful
        clearKeyValueLocalStorage(state, pageName);
    }

    return (
        <>
            <Forms fields={state} submitText={"Log in"} dispatch={dispatch} submit={loginUser} canSubmit={true} />
            <h3>Or you can join us by</h3>
            <button className="rounded-full px-5 py-2 bg-blue-400 hover:bg-blue-600">Google</button>
        </>
    );
}

export default LogIn;