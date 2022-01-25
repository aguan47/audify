const ErrorBanner = ({ message, show }) => {
    return(
        <>
            { show && <h1>{message}</h1> }
        </>
    );
}

export default ErrorBanner;