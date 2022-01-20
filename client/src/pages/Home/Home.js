import NavBar from "../../components/NavBar/NavBar";


const homePaths = [
    {name: "Log in", path: "/log-in"},
    {name: "Register", path: "/register"}
];

const Home = () => {
    return (
        <div className="min-h-screen">
            <NavBar paths={homePaths}/>
        </div>
    );
}

export default Home;