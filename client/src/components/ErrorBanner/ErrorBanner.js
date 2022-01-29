const ErrorBanner = ({ message, show }) => {
    return(
        <>
            { show && <h1 className="text-center bg-red-400 text-white py-2 mb-2">{message}</h1> }
        </>
    );
}

export default ErrorBanner;