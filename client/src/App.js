import { Navigate, Route, Routes } from "react-router";
import UserContext from './context/UserContext';
import Home from './pages/Home/Home';
import Registration from "./pages/Registration/Registration";
import LogIn from "./pages/LogIn/LogIn";
import Journals from "./pages/Journals/Journals";
import Profile from "./pages/Profile/Profile";
import Logout from "./pages/Logout/Logout";
import { useEffect, useState } from "react";
import { initialAuthenticate } from "./events/Authenticate";
import FullLoader from "./components/Loading/FullLoader/FullLoader";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    isAuth: false,
    accessToken: '',
    refreshToken: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      initialAuthenticate(user, setUser, null);
    }, 1000);
  }, []);

  // Unauthenticated path
  let paths = (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/log-in" element={<LogIn />} />
      <Route exact path="/register" element={<Registration/>} />
      <Route path="*" element={<Navigate replace to="/"/>} />
    </Routes>
  );

  if (user.isAuth) {
    paths = (
      <Routes>
        <Route exact path="/journals" element={<Journals/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/logout" element={<Logout/>} />
        <Route path="*" element={<Navigate replace to="/journals"/>} />
      </Routes>
    );
  }

  return (
    <>
      <FullLoader show={isLoading}/>
      { !isLoading &&  (
        <UserContext.Provider value={{user, setUser}}>
          {paths}
        </UserContext.Provider>
      )}
    </>
  );
}

export default App;