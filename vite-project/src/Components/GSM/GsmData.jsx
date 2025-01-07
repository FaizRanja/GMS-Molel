import React, { useState } from "react";

const GsmData = () => {
  const [message, setMessage] = useState("");
  const [command, setCommand] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const handleSendCommand = async () => {
    if (!command || !ipAddress) {
      return alert("Please provide both command and IP address");
    }

    try {
      const response = await fetch("http://localhost:4000/api/send-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command, ipAddress }),
      });
      const result = await response.json();
      alert(result.message);
      setMessage(result.data);
    } catch (error) {
      alert("Failed to send command: " + error.message);
    }
  };

  return (
    <div>
      <h2>GSM Module Control</h2>
      <div>
        <textarea
          rows="10"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          readOnly
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter GSM IP Address"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button onClick={handleSendCommand}>Send Command</button>
      </div>
    </div>
  );
};




export default GsmData
