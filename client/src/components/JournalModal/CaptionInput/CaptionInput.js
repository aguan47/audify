import { motion } from "framer-motion";

const textAreaVariants = {
    focus: {
        height: "150px", 
        transition: {type: "tween"}
    }
}

const CaptionInput = ({caption, captionHandler}) => {
    return(
        <div className="flex w-full items-center relative top-0">
            <motion.textarea
                variants={textAreaVariants} 
                whileFocus="focus"
                exit="exit"
                onChange={captionHandler} value={caption} name="title" placeholder="Enter journal caption" className="pt-1 pr-10 pb-1 pl-1 m-1 w-full rounded resize-none border-2 border-grey-200 focus:border-blue-1 focus:outline-none"/>
            <h1 className="absolute left-[92%] top-[10%] text-sm text-gray-400">{caption.length.toString().padStart(3,0)}</h1>
        </div>
    );
}

export default CaptionInput;
