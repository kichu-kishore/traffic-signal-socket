import poolDbConfig from "../dbCon/poolCon.js";
import { getTheColorCategoriesForSignalBlink } from "./trafficLightController.js";

async function fectAllTheStations(req, res) {
  try {
    const result = await poolDbConfig.query("SELECT * FROM stations");
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function fetchAllTheTrafficLights(req, res) {
  const { stationId } = req.params;

  /** Get the traffic light and its category -- category means the normal and 4light and so on */
  const result = await poolDbConfig.query(`
        select tl.id as traffic_light_id, tl.traffic_lights_category as tl_category, tl.stations, tlc.id as tlc_category_id, sts.name as station_name, tlc.* 
        from traffic_lights as tl
        join traffic_lights_category as tlc on 
        tlc.id = tl.traffic_lights_category
        join stations as sts on tl.stations = sts.id
        where tl.stations = ${stationId} order by tl.id`);
  const responseArray = new Array();

  for (let data of result.rows) {
    let singleTrafficLightData = { ...data };
    /** Ger tge traffic light colors --- One to many relation -- means one light have many colors */
    let fetchTheTrafficColors = await poolDbConfig.query(`select * from traffic_light_colors where traffic_lights = ${data.traffic_light_id}`);
    let trafficColorsIdList = fetchTheTrafficColors.rows.map(item => item.id);

    /** Based on the traffic colors need to fetch the color categories, bcoz in the front end need to manifest the color code */
    let colorDetailsBasedOnTheId = await poolDbConfig.query(`
      select tlcat.name as color_name, tlcat.color_code, tlcat.indication_name, 
      tlc.traffic_lights_color_category as color_category_id
      from traffic_light_colors as tlc
      join traffic_lights_color_category as tlcat
      on tlcat.id = tlc.traffic_lights_color_category
      where  tlc.id = ANY($1::int[])`, [trafficColorsIdList]);

    singleTrafficLightData.colorDetails = colorDetailsBasedOnTheId.rows;

    const recentSignalDetails = await poolDbConfig.query(`select * from traffic_light_signal where traffic_lights = ${data.traffic_light_id} order by id desc limit 1`);
    const recentData = recentSignalDetails.rows[0];
    let { blinkSignalId, blinkSignalSpecialAspectId } = await getTheColorCategoriesForSignalBlink(recentData?.signal_color, recentData?.special_aspect_signal_color);

    singleTrafficLightData.recentSignalData = {
      blinkSignalId: blinkSignalId,
      specialAspectBlikSignalId: blinkSignalSpecialAspectId,
      signal_date_and_time: recentData?.signal_date_and_time
    };

    // if the light has special aspects such as P or c Means get the color and its category
    if (data.has_special_aspects == true) {
      let fetchTheTrafficColors = await poolDbConfig.query(`select * from traffic_light_colors_special_aspects where traffic_lights = ${data.traffic_light_id}`);
      let trafficColorsIdListSpecialAspects = fetchTheTrafficColors.rows.map(item => item.id);
      let speciaAspectsColorDetailsBasedOnTheId = await poolDbConfig.query(`
        select tlcat.name as color_name, tlcat.color_code,
        tlcat.indication_name, 
        tlc.traffic_lights_color_category as color_category_id from traffic_light_colors_special_aspects as tlc
        join traffic_lights_color_category as tlcat
        on tlcat.id = tlc.traffic_lights_color_category
        where  tlc.id = ANY($1::int[])`, [trafficColorsIdListSpecialAspects]);
      singleTrafficLightData.specialAspectsColorDetails = speciaAspectsColorDetailsBasedOnTheId.rows;
    }

    responseArray.push(singleTrafficLightData);
  }
  res.status(200).json(responseArray);
}


export { fectAllTheStations, fetchAllTheTrafficLights };
