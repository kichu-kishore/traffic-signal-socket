/* 
	@author : Kishore S	
*/

import express from "express";
import http from "http";
import { Server } from "socket.io";

import trafficSignalRouter from "./routes/trafficSignalRoutes.js";
import {
  insertRandomDataAtParticularInterval,
  trafficSignalEventEmitter,
} from "./controllers/trafficLightController.js";

/** Create the expres App */
const app = express();


/** Set up the cross origin part for API*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with specific origins if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json()); // Parse and Return as a JSON
app.use(express.urlencoded({ extended: true }));

/** Url Groups and Importing*/
app.use("/api/traffic-signal-data/", trafficSignalRouter);

/** Setup the simple event emiter using the socket.io */
const soketserver = http.createServer(app);
const socketIo = new Server(soketserver, {
  cors: {
    origin: "http://localhost:5173", // Replace with your React app's URL
    methods: ["GET", "POST"],
  },
});

/** For Connection Checking */
socketIo.on("connection", (socket) => {
  console.log("A client connected via Socket.IO");
  socket.emit("welcome", "Socket Connected Successfully ");
  socket.on("hello", (data) => {
    console.log("Received message from client:", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/** Listen for the DB Changes */
trafficSignalEventEmitter(socketIo).catch((err) =>
  console.error("Error while reading the DB Changes:", err)
);

insertRandomDataAtParticularInterval().catch((err) => console.log('Some Error is came',  err));

// setTimeout(async() => {
//  await poolDbConfig.query(`INSERT INTO traffic_light_signal(id, traffic_lights,signal_date_and_time, signal_color, special_aspect_signal_color) VALUES (NEXTVAL('traffic_light_signal_id_seq'), 4, NOW(), 10, 19)`);
// }, 4000);

//@run the services
const PORT = process.env.PORT || 8080;
soketserver.listen(PORT, () => {  // Create a server with the socket
  console.log(`Server is running on port ${PORT}.`);
});

export default socketIo;