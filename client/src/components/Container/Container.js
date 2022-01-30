import { motion } from 'framer-motion';

const containerVariants = {
    initial: {
        y: "200%",
    },
    animate: {
        y: 0,
        transition: {
            style: "tween",
        }
    },
    exit: {
        y: "-200%",
        transition: {
            style: "tween",
            ease: "easeInOut",
        }
    }
}

const Container = ({children}) => {
    return (
        <motion.div variants={containerVariants} animate="animate" initial="initial" exit="exit" className="w-screen h-screen">
            {children}
        </motion.div>
    );
}

export default Container;