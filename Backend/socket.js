const socketIo = require("socket.io");
const userModel = require("./models/userModel");
const captainModel = require("./models/captainModel");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client Connected: ${socket.id}`);

    //we make an event join in which we are asking two things userId and userType from data
    //if it is user then update its socketId accordingly.
    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType == "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Handle captain status changes
    socket.on("captain-status-change", async (data) => {
      const { captainId, status } = data;

      try {
        await captainModel.findByIdAndUpdate(captainId, { status });
        console.log(`Captain ${captainId} status changed to ${status}`);
      } catch (error) {
        console.error("Error updating captain status:", error);
      }
    });

    // Handle when captain is not available for a ride
    socket.on("captain-not-available", async (data) => {
      const { rideId, captainId, reason } = data;
      console.log(
        `Captain ${captainId} not available for ride ${rideId}: ${reason}`
      );

      // You can add logic here to reassign the ride to other available captains
      // or notify the user that the captain is not available
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };

// Socket.IO is a library that allows real-time, bi-directional communication between a server and a client.
// It’s commonly used for chat applications, live updates, or any feature that requires instant data exchange
// without reloading the page.
// In short: It allows the server and client to send and receive messages instantly.

//about the code

// Imports the Socket.IO library for real-time communication.

//initializing the connection from any client:-

// socketIo(server): Attaches Socket.IO to your HTTP server.
// cors (Cross-Origin Resource Sharing):
// origin: '*': Allows connections from any client (domain).
// methods: ['GET', 'POST']: Only allows GET and POST requests.
// This ensures your Socket.IO server can accept connections from anywhere.

//io.on('connection'): Listens for new client connections.
//socket: Represents a single connection from a client.
// console.log(...): Prints a message when a client connects or disconnects.
// In simple words: When a client connects, the server logs a message and listens for a disconnect event.

// io.to(socketId): Targets a specific client using their socketId.
// emit('message', message): Sends a message to that specific client.
// If Socket.IO hasn’t been initialized, it logs an error message.
//now we want to connect user and captain so whenever any client request for ride then al captains available get that request for ride.so we want bith usermodel and captainmodel.
