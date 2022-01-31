import emptyImage from '../../images/no_data.svg';

const NoData = () => {
    return(
        <div className='flex flex-col gap-y-8 h-full justify-center items-center p-5'>
            <img src={emptyImage} alt="Two empty task lists" className='w-1/4 opacity-80'/>
            <h1 className='text-gray-500'>No journals found!</h1>
        </div>
    );
}

export default NoData;