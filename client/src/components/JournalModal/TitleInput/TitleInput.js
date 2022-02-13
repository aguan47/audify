const TitleInput = ({titleHandler, title}) => {
    return (
        <div className="flex w-full items-center relative top-0">
            <input type="text" onChange={titleHandler} value={title} name="title" placeholder="Enter journal title" className="pt-1 pr-10 pb-1 pl-1 m-1 w-full rounded border-2 border-grey-200 focus:border-blue-1 focus:outline-none"/>
            <h1 className="absolute left-[92%] text-sm text-gray-400">{(50 - title.length).toString().padStart(3,0)}</h1>
        </div>
    );
}

export default TitleInput;