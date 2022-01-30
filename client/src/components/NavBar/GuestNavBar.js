import NavBar from "./NavBar";

const homePaths = [
    {name: "Log in", path: "/log-in"},
    {name: "Register", path: "/register"}
];

const GuestNavBar = () => {

    return (
        <NavBar paths={homePaths}/>
    );
}

export default GuestNavBar;