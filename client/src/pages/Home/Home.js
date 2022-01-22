import NavBar from "../../components/NavBar/NavBar";


const homePaths = [
    {name: "Log in", path: "/log-in"},
    {name: "Register", path: "/register"}
];

const Home = () => {
    document.title = "Welcome"

    return (
        <div className="min-h-screen">
            <NavBar paths={homePaths}/>
        </div>
    );
}

export default Home;