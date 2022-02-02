import moment from 'moment';

const Journal = ({title, caption, audioSource, createDate}) => {
    console.log(createDate);
    return (
        <div className="flex flex-col w-3/4 bg-white shadow-2xl">
            <h1 className="text-2xl">{title}</h1>
            <p>{caption}</p>
            <p>{moment(new Date(createDate)).fromNow()}</p>
            <audio controls>
                <source src={audioSource}/>
            </audio>
        </div>
    );
} 

export default Journal;