import clsx from "clsx";

function NormalSignalComponent(props) {
    const { item, activeColorId, activeSpecialAspectId } = props;
    const { colorDetails, has_special_aspects: hasSpecialAspects, special_aspects_code: specialAspectsCode, specialAspectsColorDetails } = item;
    return (<>
        <div className='flex flex-col items-center'>
            <div className="w-10 h-22 rounded-lg p-4 flex flex-col items-center space-y-4 bg-slate-950">
                {colorDetails.map((color) => {
                    const isActive = activeColorId === color.color_category_id;
                    return (
                        <div
                            key={color.color_category_id} // Add a unique key if possible
                            className={clsx("w-6 h-6 rounded-full transition-colors duration-300", {
                                "dark:bg-gray-500": !isActive,
                            })}
                            style={{
                                backgroundColor: isActive ? color.color_code : "",
                            }}
                        >
                        </div>
                    );
                })}
            </div>
            {hasSpecialAspects && (
                <div className="relative bg-white w-3 h-12 rounded-t-md mt-0.2">
                    {specialAspectsColorDetails.map(special => {
                        let isActive = activeSpecialAspectId == special.color_category_id ? true : false;
                        return (<div
                            style={{
                                backgroundColor: isActive ? special.color_code : "",
                            }}
                            className={clsx(`absolute bottom-[0.8rem] left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full`, {
                                'dark:bg-gray-500': !isActive
                            })} />)
                    })}
                    {specialAspectsCode && (
                        <div className="absolute bottom-[2rem] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white text-black text-center font-bold rounded-full">{specialAspectsCode}</div>
                    )}
                </div>
            )}
        </div >
    </>)
}

export default NormalSignalComponent;