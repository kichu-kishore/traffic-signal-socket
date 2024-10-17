import { useEffect, useState } from "react";
import DialogBox from "../../components/dialogBox";
import { io } from "socket.io-client";

function randomId() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function SignalDetailsModel(props) {
    const { trafficLightId, closeModel, showModel, currentData } = props;
    const [receivingSignalData, setReceivingSignalData] = useState({});

    useEffect(() => {
        const socketIo = io(import.meta.env.SOCKET_SERVER_URL);
        if (showModel) {
            
            socketIo.on(`database_change_${trafficLightId}`, (data) => {
                setReceivingSignalData((prev) => ({
                    ...prev,
                    [randomId()]: {
                        activeColorId: data.blinkSignalId,
                        activeSpecialAspectId: data.activeSpecialAspectId ?? null,
                        timeStamp: dayjs(data.signal_date_and_time).format('DD-MM-YYYY hh:mm:ss'),
                        trafficLightId: data.traffic_light_id
                    }
                }))
            });
        }
        return () => {
            socketIo.disconnect();
        };
    }, [showModel]);

    useEffect(() => {
        if(showModel && Object.keys(currentData).length > 0) {
            console.log(currentData);
            setReceivingSignalData((prev) => ({
                ...prev,
                [randomId()]: {
                    ...currentData
                }
            }))
        }
    }, [currentData]);


    return (<>
        <DialogBox
            showModel={showModel}
            closeModel={closeModel}
            header={"Traffic Light Details"}
        >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Traffic Light Color
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(receivingSignalData).map(item => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item?.timeStamp}
                                </th>
                                {/* <td className="px-6 py-4">
                                    {item?.activeSpecialAspectId}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DialogBox>
    </>);
}

export default SignalDetailsModel;