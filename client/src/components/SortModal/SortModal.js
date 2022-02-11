import Modal from "../Modal/Modal";
import { BLUE_BUTTON, OFF_BUTTON, BIG_BLUE_BUTTON } from '../../tailwind/tailwind';
import ColorBar from '../ColorBar/ColorBar';
import { sortAndFilter } from "../../events/Journals";

const SortModal = ({show, clickHandler, journals, setJournals, 
        isAscending, setIsAscending, shouldColorFilter, 
        setShouldColorFilter, currentColor, setCurrentColor}) => {

    const sortAndFilterHandler = () => sortAndFilter(shouldColorFilter, currentColor, isAscending, journals, setJournals);

    return (
        <Modal show={show} title={"Sort journals"} clickHandler={clickHandler} >
            <h1 className="mx-2 font-bold text-gray-500">How to sort?</h1>
            <div className="flex items-center justify-center gap-x-5 m-3">
                <button 
                    className={isAscending ? BLUE_BUTTON : OFF_BUTTON} 
                    onClick={() => setIsAscending(true)}
                >Ascending</button>
                <button 
                    className={!isAscending ? BLUE_BUTTON : OFF_BUTTON} 
                    onClick={() => setIsAscending(false)}
                >Descending</button>
            </div>
            <h1 className="mx-2 font-bold text-gray-500">Filter by color?</h1>
            <div className="flex items-center justify-center gap-x-5 m-3">
                <button 
                    className={shouldColorFilter ? BLUE_BUTTON : OFF_BUTTON} 
                    onClick={() => setShouldColorFilter(true)}
                >Yes</button>
                <button 
                    className={!shouldColorFilter ? BLUE_BUTTON : OFF_BUTTON} 
                    onClick={() => setShouldColorFilter(false)}
                >No</button>
            </div>
            {
                shouldColorFilter &&
                <>
                    <h1 className="mx-2 font-bold text-gray-500">Filter journals by what color?</h1>
                    <div className="flex items-center justify-center gap-x-5 m-3">
                        <ColorBar currentColor={currentColor} setCurrentColor={setCurrentColor} />
                    </div>
                </>
            }
            <button className={BIG_BLUE_BUTTON} onClick={sortAndFilterHandler}>Save</button>
        </Modal>
    );
}

export default SortModal;