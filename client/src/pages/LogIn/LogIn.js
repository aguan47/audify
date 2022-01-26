import { useContext, useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { formReducer, loginState } from "../../reducer/formReducer";
import { importKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import { FULL_UPDATE_STATE } from '../../reducer/actions/formActions';
import { useNavigate } from 'react-router-dom';
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import UserContext from "../../context/UserContext";
import { getAuthStateAndProps, authenticateUser } from "../../events/Authenticate";

const pageName = "login";
const apiPath = '/users/login';
document.title = "Log in at Audify";

const LogIn = () => {
    const [state, dispatch] = useReducer(formReducer, loginState);
    const [errorState, setErrorState] = useState({
        isError: false,
        message: ""
    });
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(loginState, pageName)});
    }, []);
    
    useEffect(() => {
        saveKeyValueToLocalStorage(state, pageName, ["password"]);
    }, [state]);

    const loginUser = getAuthStateAndProps(errorState, setErrorState, state, user, setUser, navigate, pageName, apiPath)(authenticateUser);

    return (
        <>
            <ErrorBanner message={errorState.message} show={errorState.isError}/>
            <Forms fields={state} submitText={"Log in"} dispatch={dispatch} submit={loginUser} canSubmit={true} />
            <h3>Or you can join us by</h3>
            <button className="rounded-full px-5 py-2 bg-blue-400 hover:bg-blue-600">Google</button>
        </>
    );
}

export default LogIn;