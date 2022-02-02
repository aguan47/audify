import moment from 'moment';
import { BLUE, GREEN, RED } from '../../../config/constants';
import { BLUE_JOURNAL, GREEN_JOURNAL, RED_JOURNAL, YELLOW_JOURNAL } from '../../../tailwind/tailwind';


const Journal = ({title, caption, audioSource, createDate, color}) => {
    let style = null;
    switch(color) { 
        case BLUE:
            style = BLUE_JOURNAL;
            break;
        case RED:
            style = RED_JOURNAL;
            break;
        case GREEN:
            style = GREEN_JOURNAL;
            break;
        default:
            style = YELLOW_JOURNAL;
            break;
    }


    return (
        <div className={style}>
            <div className='mx-5 p-1'>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p>{moment(new Date(createDate)).fromNow()}</p>
                </div>
                <p>{caption}</p>
            </div>
            <audio controls>
                <source src={audioSource}/>
            </audio>
        </div>
    );
} 

export default Journal;