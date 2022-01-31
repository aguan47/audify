import { BLUE_BUTTON } from "../../tailwind/tailwind";

const FileUpload = ({changeHandler}) => {
    return (
        <>
            <label className={BLUE_BUTTON}>
                Upload new picture
                <input type="file" accept="image/*" className="hidden" onChange={changeHandler}/>
            </label>
        </>
    );
}

export default FileUpload;