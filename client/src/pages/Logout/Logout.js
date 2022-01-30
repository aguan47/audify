import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import FullLoader from "../../components/Loader/FullLoader/FullLoader";
import UserContext from "../../context/UserContext";
import { logoutUser } from "../../events/Authenticate";

const Logout = () => {
    const {user, setUser} = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        logoutUser(user, setUser, navigate);
    }, []);

    return (
        <FullLoader show={true}/>
    );
}

export default Logout;