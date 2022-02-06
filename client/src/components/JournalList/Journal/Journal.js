import moment from 'moment';
import { BLUE, GREEN, RED } from '../../../config/constants';
import { BLUE_JOURNAL, GREEN_JOURNAL, RED_JOURNAL, YELLOW_JOURNAL } from '../../../tailwind/tailwind';
import { GMTToLocal } from '../../../utlities/helper';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import JournalOptions from './JournalOptions/JournalOptions';


const Journal = ({title, caption, audioSource, createDate, color, showOptions, clickHandler}) => {
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
        <div className={style} onClick={clickHandler} >
            <div className='mx-5 p-1'>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className='my-2'>{moment(GMTToLocal(createDate)).fromNow()}</p>
                </div>
                <p>{caption}</p>
            </div>
            <AudioPlayer source={audioSource} color={color}/>
            { showOptions && <JournalOptions/>}
        </div>
    );
} 

export default Journal;