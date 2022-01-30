const FileUpload = (props) => {
    return (
        <>
            <label className="rounded-full bg-primary-btn py-1 px-5 text-white hover:bg-secondary-btn transition cursor-pointer flex flex-col justify-center items-center font-bold">
                Upload new picture
                <input type="file" accept="image/*" className="hidden"/>
            </label>
        </>
    );
}

export default FileUpload;