import { AnimatePresence, motion } from "framer-motion";

const modalVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

const Modal = props => {

    return (
            <AnimatePresence exitBeforeEnter>
            {
                props.show &&
                <motion.div variants={modalVariants} key={"key-1"} initial="initial" animate="animate" exit="exit">
                <div className="w-full flex flex-col justify-center items-center h-full bg-black opacity-50 absolute top-0"></div>
                    <div className="w-full flex flex-col justify-center items-center h-full absolute top-0">
                        <div className="flex flex-col justify-center w-2/5 rounded p-5 bg-primary-bg shadow-2xl">
                            <div className="flex justify-between m-1">
                                <h1 className="mx-1 text-primary-btn font-bold">{props.title}</h1>
                                <></>
                                <span className="material-icons cursor-pointer" onClick={props.clickHandler}>close</span>
                            </div>
                            {props.children}
                        </div>
                </div>
                </motion.div>
            } 
            </AnimatePresence>
    );
}

export default Modal;