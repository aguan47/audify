import { useLocation } from "react-router";
import NavLink from "./NavLink/NavLink";

const NavBar = props => {

    let location = useLocation();
    let navLinks = props.paths && props.paths.map(path => <NavLink key={path.name} pathName={path.name} path={path.path} current={location.pathname === path.path} design={path.btnDesign} />);

    return (
        <nav className="flex justify-between px-7 py-3">
            {/* <div className="">Left side</div> */}
            <h1></h1>
            <div>{navLinks}</div>
        </nav>
    );
}

export default NavBar;