const Loader = () => {
    let circleCommonClasses = 'h-5 w-5 bg-current rounded-full text-green-600';

    return (
        <div className='flex justify-center h-10 items-center'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;