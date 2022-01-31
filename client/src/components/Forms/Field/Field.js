import { INPUT, LABEL } from "../../../tailwind/tailwind";

const Field = (props) => {
    return (
        <>
            <label className={LABEL}>{props.label}</label>
            <input className={INPUT} {...props.inputOptions} onChange={props.changeText}/>
        </>
    );
} 

export default Field;