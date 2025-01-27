
const server = require("./app");
const dbConnection = require("./Db/Db");


const port = process.env.PORT || 3001;
dbConnection()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is running on port  http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1);
    });



// // const { SerialPort } = require('serialport'); // Import SerialPort library
// // const { ReadlineParser } = require('@serialport/parser-readline'); // Import parser for reading GSM module responses

// // // Configure the serial port
// // const port = new SerialPort({ path: 'COM5', baudRate: 115200 }); // Replace 'COM5' with your actual port
// // const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' })); // Set up the parser for responses

// // // Event when the port is opened
// // port.on('open', () => {
// //     console.log('Serial port opened successfully.');
// //     setupGPRS(); // Start GPRS setup and data transmission
// // });

// // // Event to handle data received from the GSM module
// // parser.on('data', (data) => {
// //     console.log('Response from GSM module:', data);

// //     if (data.includes('CONNECT OK')) {
// //         console.log('Connection to server successful.');
// //     } else if (data.includes('ERROR')) {
// //         console.error('GSM module encountered an error.');
// //     } else if (data.includes('SEND OK')) {
// //         console.log('Data sent successfully.');
// //     } else if (data.includes('CLOSE OK')) {
// //         console.log('Connection closed by GSM module.');
// //     }
// // });

// // // Event to handle port errors
// // port.on('error', (err) => {
// //     console.error('Serial port error:', err.message);
// // });

// // // Function to set up GPRS and send data to a remote server
// // async function setupGPRS() {
// //     try {
// //         console.log('Setting APN...');
// //         await sendATCommand('AT+CSTT="internet","",""\r', 'OK', 5000); // Increased timeout to 5000ms

// //         console.log('Bringing up wireless connection...');
// //         await sendATCommand('AT+CIICR\r', 'OK', 5000); // Increased timeout to 5000ms

// //         console.log('Getting IP address...');
// //         await sendATCommand('AT+CIFSR\r', 'OK', 5000); // Increased timeout to 5000ms

// //         console.log('Establishing connection to remote server...');
// //         await sendATCommand('AT+CIPSTART="TCP","192.168.1.100","8080"\r', 'CONNECT OK', 5000); // Increased timeout to 5000ms

// //         console.log('Preparing to send data...');
// //         await sendATCommand('AT+CIPSEND\r', '>', 1000);

// //         const dataToSend = 'Hello from GSM module!';
// //         console.log(`Sending data: ${dataToSend}`);
// //         await sendData(dataToSend);

// //         console.log('Closing the connection...');
// //         await sendATCommand('AT+CIPCLOSE\r', 'CLOSE OK', 1000);

// //         console.log('Data transmission completed.');
// //     } catch (error) {
// //         console.error('Error during GPRS setup and data transmission:', error.message);
// //     }
// // }

// // // Function to send an AT command and wait for a specific response
// // async function sendATCommand(command, expectedResponse, timeout = 5000) { // Increased timeout to 5000ms
// //     return new Promise((resolve, reject) => {
// //         port.write(command, (err) => {
// //             if (err) {
// //                 return reject(new Error(`Failed to send AT command: ${err.message}`));
// //             }

// //             // Set up a timeout and listen for the expected response
// //             const timer = setTimeout(() => {
// //                 reject(new Error(`Timeout waiting for response: ${expectedResponse}`));
// //             }, timeout);

// //             parser.once('data', (data) => {
// //                 console.log('Raw response:', data); // Log raw response for debugging
// //                 if (data.includes(expectedResponse)) {
// //                     clearTimeout(timer);
// //                     resolve(data);
// //                 } else {
// //                     clearTimeout(timer);
// //                     reject(new Error(`Unexpected response: ${data}`));
// //                 }
// //             });
// //         });
// //     });
// // }

// // // Function to send data to the GSM module
// // async function sendData(data) {
// //     return new Promise((resolve, reject) => {
// //         port.write(`${data}\x1A`, (err) => { // Send data and end with Ctrl+Z (\x1A)
// //             if (err) {
// //                 return reject(new Error(`Failed to send data: ${err.message}`));
// //             }
// //             resolve();
// //         });
// //     });
// // }

// // // Helper function to pause execution
// // function wait(ms) {
// //     return nsdjfjsdaew Promise((resolve) => setTimeout(resolve, ms));
// // }

// const net = require('net');

// // GSM module IP and port
// const simIp = '10.127.249.205';  // GSM module's IP address
// const simPort = 1234;           // GSM module's port (example)

// // Data to send (e.g., price and meter values)
// const message = "Price:100,Meter:200";

// // Create a TCP client
// const client = new net.Socket();

// // Connect to the GSM module via TCP
// client.connect(simPort, simIp, () => {
//   console.log('Connected to GSM module.');
  
//   // Send the data to the GSM module
//   client.write(message, (err) => {
//     if (err) {
//       console.error('Error while sending data:', err.message);
//     } else {
//       console.log('Data sent successfully.');
//     }
//   });
// });

// // Handle data received from the GSM module
// client.on('data', (data) => {
//   console.log('Response from GSM module:', data.toString());
//   client.destroy(); // Close connection after receiving the response
// });

// // Handle errors
// client.on('error', (err) => {
//   console.error('Connection error:', err.message);
//   client.destroy();
// });

// // Handle connection timeout
// client.on('timeout', () => {
//   console.error('Connection timeout.');
//   client.destroy();
// });

// // Handle connection closure
// client.on('close', () => {
//   console.log('Connection closed.');
// });


// const net = require('net');

// // GSM Module ka IP aur Port
// const GSM_IP = '10.127.249.205'; // Replace karo GSM ka IP
// const GSM_PORT = 1234;        // Replace karo GSM ka port

// // TCP Client Create karo
// const client = new net.Socket();

// client.connect(GSM_PORT, GSM_IP, () => {
//     console.log(`Connected to GSM module at ${GSM_IP}:${GSM_PORT}`);

//     // Data Send karo
//     const message = 'Hello GSM Module!';
//     client.write(message);
//     console.log(`Message sent: ${message}`);
// });

// client.on('data', (data) => {
//     console.log(`Received: ${data.toString()}`);
// });

// client.on('error', (err) => {
//     console.error(`Error: ${err.message}`);
// });

// client.on('close', () => {
//     console.log('Connection closed');
// });

 