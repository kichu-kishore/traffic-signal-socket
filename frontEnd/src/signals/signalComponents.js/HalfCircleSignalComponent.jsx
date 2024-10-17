import clsx from "clsx";

function HalfCircleSignalComponent(props) {
    const { item, activeColorId } = props;
    const { colorDetails } = item;
    return (<>
        <div className="flex justify-center items-center">
            <div className="relative w-20 h-20 bg-slate-950 rounded-tr-full">
                {colorDetails.map((color, index) => {
                    let cssNames = index == 0 ? 'top-1.5 left-1.5' : index == 1 ? 'bottom-1.5 left-1.5' : 'bottom-1.5 right-1.5';
                    let isActive = activeColorId == color?.color_category_id ? true : false;
                    return (<>
                        <div
                            className={clsx(`absolute ${cssNames} w-6 h-6 rounded-full`, {
                                "dark:bg-gray-500": !isActive
                            })}
                            style={{
                                backgroundColor: isActive ? color.color_code : "",
                            }}
                        />
                    </>)
                })}
            </div>
        </div>
    </>)
}

export default HalfCircleSignalComponent;