import { Navigate, Route, Routes } from "react-router";
import Home from './pages/Home/Home';
import Registration from "./pages/Registration/Registration";
import LogIn from "./pages/LogIn/LogIn";
import Journals from "./pages/Journals/Journals";
import Profile from "./pages/Profile/Profile";

const App = props => {
  let paths = (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route exact path="/log-in" element={<LogIn />} />
      <Route exact path="/register" element={<Registration/>} />
      <Route exact path="/journals" element={<Journals/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route path="*" element={<Navigate replace to="/"/>} />
    </Routes>
  )

  return (
    <>
      {paths}
    </>
  );
}

export default App;
