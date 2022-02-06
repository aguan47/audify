import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const toastVariants = {
    initial: {
        y: '250%'
    },
    animate: {
        y: '0%',
        transition: {
            style: 'tween'
        }
    },
    exit: {
        y: '250%',
        transition: {
            style: 'tween'
        }
    }
}

const Toast = ({message, show, isError }) => {
    let bannerDesign = "absolute bottom-[-25%] left-0 right-0 mx-auto z-40 rounded-full text-center bg-red-1 text-white py-2 mb-2 w-max pl-5 flex justify-between";
    if (!isError) bannerDesign = "absolute bottom-[-25%] left-0 right-0 mx-auto z-40 rounded-full text-center bg-green-1 text-white py-2 mb-2 w-max pl-5 flex justify-between";

    const [ShowToast, setShowToast] = useState(false);

    useEffect(() => {
        setShowToast(show);
    }, [show]);

    return(
        <AnimatePresence>
            { ShowToast &&
                <motion.div 
                    className={bannerDesign}
                    variants={toastVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1></h1>
                    <h1>{message}</h1> 
                    <span className="material-icons self-start mx-2 cursor-pointer" onClick={() => setShowToast(false)}>close</span>
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default Toast;    