import clsx from "clsx";
import { SEMAPHORE_WITH_SINGLE_LEFT, SEMAPHORE_WITH_SINGLE_RIGHT, SEMAPHORE_WITH_THREE } from "../../constants";

function SemaphoreComponent ( props ) {
    const { item, activeColorId } = props;
    const { colorDetails, special_aspects_code: specialAspectsCode, specialAspectsColorDetails } = item;
    console.log( item );
    return ( <>

        <div>
            {item?.code == SEMAPHORE_WITH_SINGLE_RIGHT && ( <RightHand /> )}
            {item?.code == SEMAPHORE_WITH_SINGLE_LEFT && ( <LeftHand /> )}
            {item?.code == SEMAPHORE_WITH_THREE && ( <ThreeHand /> )}
        </div >

        <div className='flex flex-col items-center'>
            <div className="relative bg-white w-3 h-4 rounded-t-md mt-0.2">
                <div className="absolute bottom-[0.6rem]  left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                </div>
            </div>
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
            <div className="relative bg-white w-3 h-8 rounded-t-md mt-0.2">
                <div className="absolute bottom-[0.6rem]  left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                </div>
            </div>

        </div >
    </> )
}
function RightHand () {
    return ( <div className="relative flex items-center">
        <div className="w-16 h-16 bg-slate-950 clip-octagon"></div>
        <div className="h-18 flex w-6 flex-col absolute bottom-[20px] right-[-30px] items-center space-y-1 rounded-lg bg-slate-950 p-3 rotate-[60deg]" >
            <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
        </div>
    </div> )

}
function LeftHand () {
    return (
        <div className="relative flex items-center">
            <div className="w-16 h-16 bg-slate-950 clip-octagon"></div>
            <div className="h-18 flex w-6 flex-col absolute bottom-[30px] left-[-23px] items-center space-y-1 rounded-lg bg-slate-950 p-3 rotate-[-420deg]" >
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            </div>
        </div>
    )
}
function ThreeHand () {
    return (
        <div className="relative flex items-center">
            <div className="w-16 h-16 bg-slate-950 clip-octagon"></div>
            <div className="h-18 flex w-6 flex-col absolute left-[-30px]  items-center space-y-1 rounded-lg bg-slate-950 p-3 rotate-[90deg]" >
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            </div>
            <div className="h-18 flex w-6 flex-col absolute bottom-[30px] left-[-23px] items-center space-y-1 rounded-lg bg-slate-950 p-3 rotate-[-420deg]" >
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            </div>
            <div className="h-18 flex w-6 flex-col absolute bottom-[20px] right-[-30px] items-center space-y-1 rounded-lg bg-slate-950 p-3 rotate-[60deg]" >
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
                <div className="h-3 w-3 rounded-full transition-colors duration-300 dark:bg-white" />
            </div>
        </div>
    )
}


export default SemaphoreComponent;