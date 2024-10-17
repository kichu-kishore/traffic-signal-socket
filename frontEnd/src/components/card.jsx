import clxs from 'clsx';
function CardComponent(props) {
    const { heading, time, children, highlight, ...rest } = props;
    return (<>
        <div {...rest} className={clxs("w-100 min-h-72 max-w-sm p-4 sm:p-4 bg-white rounded-lg shadow dark:bg-gray-800 ", {
            "border-2 border-sky-500 dark:border-sky-700": !highlight,
            "border-4 bg-amber-400 dark:border-pink-700": highlight,
        })}>
            <div className="flex flex-row justify-between align-center">
                <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{heading ?? 'Header'} </h5>
                <p class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{time ?? 'time'}</p>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                {children}
            </div>
        </div>
    </>)
}

export default CardComponent;