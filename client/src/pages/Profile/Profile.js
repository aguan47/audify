import { useEffect, useReducer, useState } from "react";
import Forms from "../../components/Forms/Forms";
import { editProfileState, formReducer } from "../../reducer/formReducer";



const data = {
    name: "Angelo Guan",
    email: "email@email.com",
    birthday: "1999-11-25",
    profile_picture: "path",
    isOauth: false  
}



const Profile = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [state, dispatch] = useReducer(formReducer, editProfileState);


    useEffect(() => {
        
    });

    let buttonClass = "bg-blue-400 px-3 py-2 text-white";
    let buttonText = "Edit profile";
    if (isEdit) {
        buttonClass = "bg-red-400 px-3 py-2 text-white";
        buttonText = "Don't save changes";
    }

    return (
        <>
            <img src={profilePicture} alt={"User portrait"}/>
            { isEdit && <input type="file" accept="image/*"/> }
            <button className={buttonClass} onClick={() => setIsEdit(!isEdit)}>{buttonText}</button> 
            <Forms fields={state} submitText={"Save changes"} dispatch={dispatch} submit={e => {e.preventDefault()}} canSubmit={isEdit}/>
        </>
    );
}

export default Profile;