import { useEffect, useState } from "react";
import CardComponent from "../components/card";
import endPoint from "../services";
import { HALF_CIRCLE, NORMAL_SIGNAL_CATEGORY, NORMAL_WITH_HALF_CIRCLE, SEMAPHORE_CATEGORY, SEMAPHORE_WITH_THREE } from "../constants";
import io from 'socket.io-client';
import dayjs from 'dayjs';
import SignalDetailsModel from "./signalComponents.js/SignalDetailsModel";
import NormalSignalComponent from "./signalComponents.js/NormalSignalComponent";
import HalfCircleSignalComponent from "./signalComponents.js/HalfCircleSignalComponent";
import NormalWithHalfCircleComponent from "./signalComponents.js/NormalWithHalfCircleComponent";
import SemaphoreComponent from "./signalComponents.js/SemaphoreComponent";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

function MainSignals() {
    const [signalData, setSignalData] = useState([]);
    useEffect(() => {
        fetch(import.meta.env.VITE_APP_URL + endPoint.stationSignalData + '/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setSignalData(data);
            })
    }, []);


    /** Check the connection is enabled or not */
    // useEffect( () => {
    //     const socketIo = io( SOCKET_SERVER_URL );
    //     socketIo.on( 'welcome', ( data ) => {
    //         console.log( 'Message from server:', data);
    //     });
    //     // Handle cleanup on component unmount
    //     return () => {
    //         socketIo.disconnect();
    //     };
    // }, [] );

    return (<>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {signalData.map(item => (<>
                <SignalLight item={item} />
            </>))}
        </div>
    </>);
}

function SignalLight(props) {
    const { item } = props;
    const [signalState, setSignalState] = useState({});
    const [showModel, setShowModel] = useState({ status: false, trafficLight: null });
    const [isHighlighting, setIsHighlighting] = useState(false);

    useEffect(() => {
        if(item?.recentSignalData) {
            let recentSignalData = item?.recentSignalData;
            setSignalState({
                activeColorId: recentSignalData.blinkSignalId,
                activeSpecialAspectId: recentSignalData.specialAspectBlikSignalId ?? null,
                timeStamp: dayjs(recentSignalData.signal_date_and_time).format('DD-MM-YYYY hh:mm:ss A'),
                trafficLightId:item.traffic_light_id
            });   
        }
    }, [item?.recentSignalData]);

    useEffect(() => {
        const socketIo = io(SOCKET_SERVER_URL);
        socketIo.on(`database_change_${item.traffic_light_id}`, (data) => {
            setSignalState({
                activeColorId: data.blinkSignalId,
                activeSpecialAspectId: data.specialAspectBlikSignalId ?? null,
                timeStamp: dayjs(data.signal_date_and_time).format('DD-MM-YYYY hh:mm:ss A'),
                trafficLightId: data.traffic_light_id
            });
            setIsHighlighting(true);
            setTimeout(() => setIsHighlighting(false), 2000);
        });
        return () => {
            socketIo.disconnect();
        };
    }, []);

    /** Closer function */
    function handleOpenForModel(id) {
        return () => {
            setShowModel({ status: true, trafficLight: id });
        }
    }

    const handleCloseForModel = () => {
        setShowModel({ status: false, trafficLight: '' });
    }

    return (<>
        {NORMAL_SIGNAL_CATEGORY.includes(item.code) && (
            <CardComponent
                time={signalState.timeStamp}
                heading = {item.station_name}
                // highlight={item.traffic_light_id == signalState?.trafficLightId ? true : false}
                highlight={isHighlighting}
                onClick={handleOpenForModel(item.traffic_light_id)}
            >
                <NormalSignalComponent item={item} activeColorId={signalState.activeColorId} activeSpecialAspectId={signalState.activeSpecialAspectId ?? ''} />
            </CardComponent>
        )}
        {HALF_CIRCLE == item.code && (
            <CardComponent
                time={signalState.timeStamp}
                heading = {item.station_name}
                // highlight={item.traffic_light_id == signalState?.trafficLightId ? true : false}
                highlight = {isHighlighting}
                onClick={handleOpenForModel(item.traffic_light_id)}
            >
                <HalfCircleSignalComponent item={item} activeColorId={signalState.activeColorId} activeSpecialAspectId={signalState.activeSpecialAspectId ?? ''} />
            </CardComponent>
        )}
        {NORMAL_WITH_HALF_CIRCLE == item.code && (
            <CardComponent
                time={signalState.timeStamp}
                heading = {item.station_name}
                // highlight={item.traffic_light_id == signalState?.trafficLightId ? true : false}
                highlight = {isHighlighting}
                onClick={handleOpenForModel(item.traffic_light_id)}
            >
                <NormalWithHalfCircleComponent item={item} activeColorId={signalState.activeColorId} activeSpecialAspectId={signalState.activeSpecialAspectId ?? ''} />
            </CardComponent>
        )}
        {SEMAPHORE_CATEGORY.includes(item.code) && (
            <CardComponent
                time={signalState.timeStamp}
                heading = {item.station_name}
                // highlight={item.traffic_light_id == signalState?.trafficLightId ? true : false}
                highlight = {isHighlighting}
                onClick={handleOpenForModel(item.traffic_light_id)}
            >
                <SemaphoreComponent item={item} activeColorId={signalState.activeColorId} activeSpecialAspectId={signalState.activeSpecialAspectId ?? ''} />
            </CardComponent>
        )}
        {showModel.status && (
            <SignalDetailsModel
                closeModel={handleCloseForModel}
                showModel={showModel.status}
                trafficLightId={showModel.trafficLight}
                currentData = {signalState}
            />
        )}

    </>)
}

export default MainSignals;