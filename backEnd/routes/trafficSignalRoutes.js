//@module
import { Router } from "express";
import { fetchAllTheTrafficLights } from "../controllers/trafficSignalController.js";
const trafficSignalRouter = Router(); // Router have nested API functionality

trafficSignalRouter.get("/station-signal-data/all/:stationId", fetchAllTheTrafficLights);

export default trafficSignalRouter;
