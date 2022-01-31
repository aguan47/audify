import { RED_LINK } from "../../tailwind/tailwind";
import NavBar from "./NavBar";

const homePaths = [
    {name: "Journals", path: "/journals"},
    {name: "Profile", path: "/profile"},
    {name: "Log out", path: "/logout", btnDesign: RED_LINK}
];

const AuthNavBar = () => {

    return (
        <NavBar paths={homePaths}/>
    );
}

export default AuthNavBar;