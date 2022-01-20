import { Navigate, Route, Routes } from "react-router";
import Home from './pages/Home/Home';


const App = props => {

  document.title = "Hello"

  let paths = (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route exact path="/log-in" element={<h1>Log in</h1>} />
      <Route exact path="/register" element={<h1>Register</h1>} />
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
