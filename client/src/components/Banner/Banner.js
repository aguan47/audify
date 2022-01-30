import { useEffect, useState } from "react";

const Banner = ({ message, show, isError }) => {

    let bannerDesign = "text-center bg-red-400 text-white py-2 mb-2 w-full flex justify-between";
    if (!isError) bannerDesign = "text-center bg-green-400 text-white py-2 mb-2 w-full flex justify-between";

    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        setShowBanner(show);
    }, [show]);

    return(
        <>
            { showBanner && 
                <div className={bannerDesign}>
                    <h1></h1>
                    <h1>{message}</h1> 
                    <span className="material-icons self-start mx-2 cursor-pointer" onClick={() => setShowBanner(false)}>close</span>
                </div>
            }
        </>
    );
}

export default Banner;