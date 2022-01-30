import { Link } from "react-router-dom";

const NavLink = props => {
    let btnStyle = "rounded-full bg-primary-btn py-1 px-5 text-white ml-5 font-bold";
    
    if (!props.current) btnStyle = "text-primary-text py-1 px-5 ml-5 hover:border-primary-btn transition font-bold";
    if (props.design) btnStyle = props.design;

    return (
        <Link to={props.path} >
            <button className={btnStyle}> 
                {props.pathName}
            </button>
        </Link>
    );
}

export default NavLink;