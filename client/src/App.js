import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import UserContext from './context/UserContext';
import { useEffect, useState } from "react";
import { initialAuthenticate } from "./events/Authenticate";
import FullLoader from "./components/Loader/FullLoader/FullLoader";
import { AnimatePresence } from 'framer-motion';

const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage'));
const Registration = React.lazy(() => import("./pages/Registration/Registration"));
const LogIn = React.lazy(() => import("./pages/LogIn/LogIn"));
const Journals = React.lazy(() => import("./pages/Journals/Journals"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Logout = React.lazy(() => import("./pages/Logout/Logout"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    isAuth: false,
    accessToken: '',
    refreshToken: ''
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initialAuthenticate(user, setUser, setIsLoading, navigate, location.pathname);
  }, []);

  let paths = null;

  if (user.isAuth && !isLoading) {
    paths = (
      <Routes location={location} key={location.key}>
        <Route exact path="/journals" element={<Journals/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/logout" element={<Logout/>} />
        <Route path="*" element={<Navigate to="/journals"/>} />
      </Routes>
    );
  } else if (!user.isAuth && !isLoading) {
    paths = (
      <Routes location={location} key={location.key}>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/log-in" element={<LogIn />} />
        <Route exact path="/register" element={<Registration/>} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    );
  }

  return (
    <Suspense fallback={<FullLoader show={true} />}>
      <FullLoader show={isLoading}/>
      <UserContext.Provider value={{user, setUser}}>
          <AnimatePresence exitBeforeEnter>
            {paths}
          </AnimatePresence>
      </UserContext.Provider>
    </Suspense>
  );
}

export default App;