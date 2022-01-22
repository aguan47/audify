import NavLink from "./NavLink/NavLink";

const NavBar = props => {

    let navLinks = props.paths && props.paths.map(path => <NavLink key={path.name} pathName={path.name} path={path.path} />);

    return (
        <nav className="flex justify-between px-7 py-3">
            <div className="">Left side</div>
            <div>{navLinks}</div>
        </nav>
    );
}

export default NavBar;