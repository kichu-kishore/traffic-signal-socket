import poolDbConfig from "../dbCon/poolCon.js";
import { pickTheRandomId, pickTheRandomIdWithNull } from "../helpers/index.js";


/** This is method is for emitting the event when
 * Note: This is method is not comming from the router
 */
async function trafficSignalEventEmitter(socketIo) {
  const client = await poolDbConfig.connect(); // Persistent client for listening
  try {
    await client.query("LISTEN signal_data_change"); // Start listening for the LISTEN signal data change
    client.on("notification", async (msg) => {
      let payload = JSON.parse(msg.payload);
      let responsePayLoadData = { ...payload.signal_data };
      let { blinkSignalId, blinkSignalSpecialAspectId } = await getTheColorCategoriesForSignalBlink(payload.signal_data.signal_color, payload.signal_data.special_aspect_signal_color);
      responsePayLoadData.blinkSignalId = blinkSignalId;
      if (payload.signal_data.special_aspect_signal_color) {
        responsePayLoadData.specialAspectBlikSignalId = blinkSignalSpecialAspectId;
      }
      responsePayLoadData.traffic_light_id = payload.signal_id;
      // console.log(responsePayLoadData);
      socketIo.emit(`database_change_${payload.signal_id}`, responsePayLoadData);
    });
    console.log("Listening to signal_data_change...");
  } catch (err) {
    console.error("Error setting up LISTEN:", err);
  }
}

/** 
 * Used to get the color category id based on the signalColor id
 */
async function getTheColorCategoriesForSignalBlink(signalColorId, specialAspectColorId) {
  let blinkSignalId;
  let blinkSignalSpecialAspectId;
  if (signalColorId) {
    let getTheColorCategory = await poolDbConfig.query(`SELECT traffic_lights_color_category from traffic_light_colors where id = ${signalColorId}`);
    blinkSignalId = getTheColorCategory.rows[0]?.traffic_lights_color_category;
  }
  if (specialAspectColorId) {
    let getTheSpecialAspectColorCategory = await poolDbConfig.query(`SELECT traffic_lights_color_category from traffic_light_colors_special_aspects where id = ${specialAspectColorId}`);
    blinkSignalSpecialAspectId = getTheSpecialAspectColorCategory.rows[0]?.traffic_lights_color_category;
  }

  return { blinkSignalId, blinkSignalSpecialAspectId };
}


/** Get the station of 1 */
async function getTheStation() {
  const dbCon = await poolDbConfig.connect();
  const stationQuery = "SELECT * from stations";
  try {
    let response = await dbCon.query(stationQuery);
    return response.rows;
  } catch (error) {
    console.log("Couldn't fetch the station", error);
  } finally {
    await dbCon.end();
  }
}

const trafficLightsMap = new Map();
/**
 * For the testing I only took the first station Id
 */
async function fetchTheTrafficLight() {
  if (trafficLightsMap.size == 0) {
    const dbCon = await poolDbConfig.connect();
    const stations = await getTheStation();
    const queryForListOfTrafficLights = `
        select tl.id as traffic_light_id, tl.traffic_lights_category as tl_category, tl.stations, tlc.id as tlc_category_id, tlc.* from traffic_lights as tl
        join traffic_lights_category as tlc on 
        tlc.id = tl.traffic_lights_category
        where tl.stations = ${stations[0]?.id} order by tl.id;
        `;
    try {
      const response = await dbCon.query(queryForListOfTrafficLights); // Start listening for the LISTEN signal data change
      for (let data of response.rows) {
        trafficLightsMap.set(data.traffic_light_id, data);
      }
      return trafficLightsMap;
    } catch (err) {
      console.error("Error while fethching", err);
    }
  } else {
    return trafficLightsMap;
  }
}

/** To insert the random id */
async function insertTheRandomDetails() {
  const trafficLightDetails = await fetchTheTrafficLight();
  let keys = trafficLightDetails.keys();
  const randomId = await pickTheRandomId(Array.from(keys));
  const toBeInsertingData = trafficLightDetails.get(randomId);
  const dataToInsertInTheDb = {};

  if (toBeInsertingData.has_special_aspects == true) {
    const fecthTheSepcialAspectColorDetailsBasedOnTheTrafficLightId = await poolDbConfig.query(`SELECT * from traffic_light_colors_special_aspects where traffic_lights=${randomId}`);
    let idList =fecthTheSepcialAspectColorDetailsBasedOnTheTrafficLightId.rows.map((item) => item.id);
    dataToInsertInTheDb.specialAspectColorCodeId = await pickTheRandomIdWithNull(idList); // Some times also insert some null values
  }
  const fecthTheColorDetailsBasedOnTheTrafficLightId = await poolDbConfig.query(`SELECT * from traffic_light_colors where traffic_lights=${randomId}`);
  let idList = fecthTheColorDetailsBasedOnTheTrafficLightId.rows.map(
    (item) => item.id
  );
  dataToInsertInTheDb.colorCodeId = await pickTheRandomIdWithNull(idList);
  
  let queryToInsertToTheSignal = `INSERT INTO traffic_light_signal(id, traffic_lights,signal_date_and_time, signal_color, special_aspect_signal_color) VALUES (NEXTVAL('traffic_light_signal_id_seq'), $1, NOW(), $2, $3);`;
  let valuesToInsert = [
    toBeInsertingData.traffic_light_id,
    dataToInsertInTheDb.colorCodeId,
    dataToInsertInTheDb?.specialAspectColorCodeId ?? null,
  ];

  try {
    await poolDbConfig.query(queryToInsertToTheSignal, valuesToInsert);
  } catch (e) {
    console.log(e);
  }
}

/** This will mimic the live data comming from the traffic signal data */
async function insertRandomDataAtParticularInterval() {
  setInterval(insertTheRandomDetails, 2000);
}

export { trafficSignalEventEmitter, insertRandomDataAtParticularInterval , getTheColorCategoriesForSignalBlink };
