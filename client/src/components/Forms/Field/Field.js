const Field = (props) => {
    return (
        <>
            <label className="text-primary-btn font-bold">{props.label}</label>
            <input className="py-3 px-4 my-2 rounded-full border-solid border-2 border-grey-200 focus:border-primary-btn focus:outline-none" {...props.inputOptions} onChange={props.changeText}/>
        </>
    );
} 

export default Field;