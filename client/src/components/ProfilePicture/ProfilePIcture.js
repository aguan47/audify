import { memo } from 'react';
import FileUpload from "../FileUpload/FileUpload";

const ProfilePicture = ({profilePicture, changePictureHandler, isEdit}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img src={profilePicture} alt={"User portrait"} className="rounded-full m-5 w-1/8 h-1/8 object-cover"/>
            { isEdit && <FileUpload changeHandler={changePictureHandler} /> }
        </div>
    );
}

const compareProps = (prev, current) => {
    return prev.profilePicture === current.profilePicture &&
        prev.isEdit === current.isEdit;
}

export default memo(ProfilePicture, compareProps);