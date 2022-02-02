import { useContext } from "react";
import { useLocation } from "react-router";
import UserContext from "../../context/UserContext";
import NavLink from "./NavLink/NavLink";

const NavBar = props => {

    let location = useLocation();
    let navLinks = props.paths && props.paths.map(path => <NavLink key={path.name} pathName={path.name} path={path.path} current={location.pathname === path.path} design={path.btnDesign} />);
    const {user} = useContext(UserContext);

    return (
        <nav className="flex justify-between px-7 py-3 sticky top-0 z-10 bg-[#ebeff3]">
            <div className="font-bold">{user.name}</div>
            <h1></h1>
            <div>{navLinks}</div>
        </nav>
    );
}

export default NavBar;