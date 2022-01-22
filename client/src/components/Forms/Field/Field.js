const Field = (props) => {
    return (
        <>
            <label>{props.label}</label>
            <input {...props.inputOptions} onChange={props.changeText}/>
        </>
    );
} 

export default Field;