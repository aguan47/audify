import { useContext, useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { formReducer, loginState } from "../../reducer/formReducer";
import { importKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import { FULL_UPDATE_STATE } from '../../reducer/actions/formActions';
import { Link, useNavigate } from 'react-router-dom';
import Banner from "../../components/Banner/Banner";
import UserContext from "../../context/UserContext";
import { getAuthStateAndProps, authenticateUser } from "../../events/Authenticate";
import Loader from '../../components/Loader/Loader';
import Container from "../../components/Container/Container";
const pageName = "login";
const apiPath = '/users/login';
document.title = "Log in at Audify";


const LogIn = () => {
    const [state, dispatch] = useReducer(formReducer, loginState);
    const [errorState, setErrorState] = useState({
        isError: false,
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(loginState, pageName)});
    }, []);
    
    useEffect(() => {
        saveKeyValueToLocalStorage(state, pageName, ["password"]);
    }, [state]);

    const loginUser = getAuthStateAndProps(errorState, setErrorState, state, user, setUser, navigate, pageName, apiPath, setIsLoading)(authenticateUser);

    return (
        <Container>
            <div className="flex justify-center items-center">
                <div className="bg-primary-btn h-screen w-3/5"> 
                    <span className="material-icons text-white m-5 cursor-pointer hover:bg-secondary-btn p-1 rounded-full" onClick={() => navigate(-1)}>arrow_back</span>
                </div>
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-primary-btn font-bold text-center text-xl my-3">Log in</h1>
                    <Banner message={errorState.message} show={errorState.isError} isError={true}/>
                    {
                        isLoading ? <Loader/>
                        : <>
                            <Forms fields={state} submitText={"Log in"} dispatch={dispatch} submit={loginUser} canSubmit={true} />
                            <p className="text-gray-400 text-center text-sm">{"Don't have an account? "}<Link to="/register" className="text-primary-btn">Sign up here</Link> </p>
                        </>
                    }
                
                </div>                
            </div>
        </Container>
    );
}

export default LogIn;