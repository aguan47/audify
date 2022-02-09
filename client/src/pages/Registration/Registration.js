import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Forms from "../../components/Forms/Forms";
import { registrationState, formReducer } from "../../reducer/formReducer";
import { importKeyValueLocalStorage, saveKeyValueToLocalStorage } from '../../utlities/helper';
import { FULL_UPDATE_STATE } from "../../reducer/actions/formActions";
import Banner from '../../components/Banner/Banner';
import UserContext from "../../context/UserContext";
import { authenticateUser, getAuthStateAndProps } from "../../events/Authenticate";
import Loader from "../../components/Loader/Loader";
import Container from "../../components/Container/Container";

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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: FULL_UPDATE_STATE, newState: importKeyValueLocalStorage(registrationState, pageName)});
    }, []);

    useEffect(() => {
        saveKeyValueToLocalStorage(regState, pageName, ["password"]);
    }, [regState]);

    const registerUser = getAuthStateAndProps(errorState, setErrorState, regState, user, setUser, navigate, pageName, apiPath, setIsLoading)(authenticateUser);

    return (
        <Container>
            <div className="flex justify-center items-center">
                <div className="bg-blue-1 h-screen w-3/5"> 
                    <span className="material-icons text-white m-5 cursor-pointer hover:bg-secondary-btn p-1 rounded-full" onClick={() => navigate(-1)}>arrow_back</span>
                </div>
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-blue-1 font-bold text-center text-xl my-3">Register now</h1>
                    <Banner message={errorState.message} show={errorState.isError} isError={true}/>
                    {
                        isLoading ? <Loader/>
                        :
                        <>
                            <Forms fields={regState} submitText={"Register now"} dispatch={dispatch} submit={registerUser} canSubmit={true} />
                            <p className="text-gray-400 text-center text-sm">{"Already have an account? "}<Link to="/log-in" className="text-blue-1">Log in here</Link> </p>
                        </>
                    }
                </div> 
            </div>
        </Container>
    );
}

export default Registration;