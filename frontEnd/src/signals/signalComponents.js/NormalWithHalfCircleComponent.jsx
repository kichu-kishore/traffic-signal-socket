import clsx from "clsx";

function NormalWithHalfCircleComponent ( props ) {
    const { item, activeColorId, activeSpecialAspectId } = props;
    const { colorDetails, has_special_aspects: hasSpecialAspects, special_aspects_code: specialAspectsCode, specialAspectsColorDetails } = item;
    return ( <>
        <div className='flex flex-col items-center'>
            <div className="w-10 h-22 rounded-lg p-4 flex flex-col items-center space-y-4 bg-slate-950">
                {colorDetails.map( ( color ) => {
                    const isActive = activeColorId === color.color_category_id;
                    return (
                        <div
                            key={color.color_category_id} // Add a unique key if possible
                            className={clsx( "w-6 h-6 rounded-full transition-colors duration-300", {
                                "dark:bg-gray-500": !isActive,
                            } )}
                            style={{
                                backgroundColor: isActive ? color.color_code : "",
                            }}
                        >
                        </div>
                    );
                } )}
            </div>
            {hasSpecialAspects && (
                <div className="relative bg-white w-3 h-12 rounded-t-md mt-0.2">
                    <div className="absolute bottom-[0.6rem]  left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                        <div className="relative w-8 h-8 bg-slate-950 rounded-tr-full">
                            {specialAspectsColorDetails.map( ( special, index ) => {
                                let cssNames = index == 0 ? 'top-1.5 left-1.5' : index == 1 ? 'bottom-1.5 left-1.5' : 'bottom-1.5 right-1.5';
                                let isActive = activeSpecialAspectId == special?.color_category_id ? true : false;

                                return ( <>
                                    <div
                                        style={{
                                            backgroundColor: isActive ? special.color_code : "",
                                        }}
                                        className={clsx( `absolute ${ cssNames } w-2 h-2 rounded-full`, {
                                            'dark:bg-gray-500': !isActive
                                        } )}></div>
                                </> )
                            } )}
                        </div>
                    </div>
                </div>
            )}
        </div >
    </> )

}

export default NormalWithHalfCircleComponent;