const Field = (props) => {
    return (
        <>
            <label className="text-blue-400 font-bold">{props.label}</label>
            <input className="py-3 px-5 my-2 rounded-full border-solid border-2 border-blue-400" {...props.inputOptions} onChange={props.changeText}/>
        </>
    );
} 

export default Field;