import { Link } from "react-router-dom";
import { BLUE_LINK, LINK_TEXT } from "../../../tailwind/tailwind";

const NavLink = props => {
    let btnStyle = BLUE_LINK
    
    if (!props.current) btnStyle = LINK_TEXT;
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