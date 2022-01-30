import NavBar from "./NavBar";

const homePaths = [
    {name: "Journals", path: "/journals"},
    {name: "Profile", path: "/profile"},
    {name: "Log out", path: "/logout", btnDesign: "rounded-full bg-red-500 py-1 px-5 text-white ml-5 hover:bg-red-600 font-bold"}
];

const AuthNavBar = () => {

    return (
        <NavBar paths={homePaths}/>
    );
}

export default AuthNavBar;