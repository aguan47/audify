import moment from 'moment';
import { BLUE, GREEN, RED } from '../../../config/constants';
import { BLUE_JOURNAL, GREEN_JOURNAL, RED_JOURNAL, YELLOW_JOURNAL } from '../../../tailwind/tailwind';
import { GMTToLocal } from '../../../utlities/helper';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import JournalOptions from './JournalOptions/JournalOptions';
import { motion } from 'framer-motion';

const journalVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    }
}


const Journal = ({title, caption, audioSource, createDate, lastModified, color, 
    showOptions, clickHandler, deleteHandler, editHandler}) => {
    
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

    let dateText = `${moment(GMTToLocal(createDate)).fromNow()}`;
    if (lastModified) {
        dateText += ` last modified ${moment(lastModified).fromNow()}`
    }

    return (
        <motion.div 
            className={style} 
            onClick={clickHandler} 
            variants={journalVariants} 
            initial="initial" 
            animate="animate" >
            <div className='mx-5 p-1'>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className='my-2'>{dateText}</p>
                </div>
                <p>{caption}</p>
            </div>
            <AudioPlayer source={audioSource} color={color}/>
            { showOptions && <JournalOptions 
                            deleteJournalHandler={deleteHandler} 
                            editJournalHandler={editHandler}/>}
        </motion.div>
    );
} 

export default Journal;