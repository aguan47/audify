import styles from './Loader.module.css';   

const Loader = () => {
    return (
        <div className='w-full flex justify-center'>
            <div className={styles.Loader}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Loader;