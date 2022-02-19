import { useEffect } from "react";

const Modal = props => {
    useEffect(() => {
        if (props.show) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [props.show]);

    return (
            <>
            {
                props.show &&
                <>
                    <div className="w-full flex flex-col justify-center items-center h-full bg-black opacity-80 fixed top-0 z-20"></div>
                        <div className="w-full flex flex-col justify-center items-center h-full absolute top-0">
                            <div className="flex flex-col justify-center w-2/5 rounded p-5 bg-white shadow-2xl fixed top-50 z-30">
                                <div className="flex justify-between m-1">
                                    <h1 className="mx-1 text-blue-1 font-bold">{props.title}</h1>
                                    <></>
                                    <span className="material-icons cursor-pointer" onClick={props.clickHandler}>close</span>
                                </div>
                                {props.children}
                            </div>
                    </div>
                </>
            } 
            </>
    );
}

export default Modal;