import styles from './FullLoader.module.css';

const FullLoader = ({show}) => {
    return (
        <>
            {   show && 
                <div className={styles.FullLoader}>
                    <div className={styles.Loader}><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </>
    );
}

export default FullLoader;