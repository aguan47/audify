import { Link } from "react-router-dom";

const NavLink = props => {
    return (
        <Link to={props.path} >
            <button className="rounded-full bg-green-400 py-1 px-5 text-white ml-5 hover:bg-green-500 transition">
                {props.pathName}
            </button>
        </Link>
    );
}

export default NavLink;