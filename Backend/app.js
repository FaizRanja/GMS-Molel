const net = require("net");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// Function to send data to the GSM module via TCP
const sendDataToGSMModule = ({ simIp, simPort, data }) => {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    console.log(`Connecting to GSM module at ${simIp}:${simPort}...`);
    client.setTimeout(10000); // 10 seconds timeout

    client.connect(simPort, simIp, () => {
      console.log("Connected to GSM module.");
      console.log("Sending data:", data);

      // Send the data
      client.write(data, (err) => {
        if (err) {
          console.error("Error while sending data:", err.message);
          client.end();
          reject(err);
          return;
        }
        console.log("Data sent successfully.");
      });
    });

    // Handle incoming response from GSM module
    client.on("data", (response) => {
      console.log("Response from GSM module:", response.toString());
      client.end();
      resolve(response.toString());
    });

    // Handle connection errors
    client.on("error", (err) => {
      console.error("Connection error:", err.message);
      client.end();
      reject(err);
    });

    client.on("timeout", () => {
      console.error("Connection timeout.");
      client.end();
      reject(new Error("Connection timeout"));
    });

    client.on("close", () => {
      console.log("Connection closed.");
    });
  });
};

// API endpoint to send data
server.post("/api/send-data", async (req, res) => {
  const { price, meterReading } = req.body;
  const simIp = process.env.SIM_IP; // GSM module IP
  const simPort = parseInt(process.env.SIM_PORT); // GSM module port

  if (!price || !meterReading) {
    return res.status(400).json({ message: "Price and meter reading are required" });
  }

  try {
    const data = `Price:${price},Meter:${meterReading}`;
    const response = await sendDataToGSMModule({ simIp, simPort, data });
    res.json({ message: "Data sent successfully to GSM module", response });
  } catch (error) {
    console.error("Failed to send data:", error.message);
    res.status(500).json({ message: "Failed to send data", error: error.message });
  }
});





// Start the server
module.exports = server;
