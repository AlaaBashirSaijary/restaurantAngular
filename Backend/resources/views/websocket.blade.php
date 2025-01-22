<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socket.IO Test</title>
</head>
<body>
    <h1>Socket.IO WebSocket Test</h1>
    <button id="connectBtn">Connect to WebSocket</button>
    <button id="disconnectBtn">Disconnect</button>
    <h2 id="status">Status: Disconnected</h2>
    <div id="messages"></div>

    <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
    <script>
        let socket;
        const status = document.getElementById('status');
        const messagesDiv = document.getElementById('messages');

        document.getElementById('connectBtn').addEventListener('click', () => {
            // Correct placement of the 'transports' option
            socket = io('http://localhost:6001', {
                transports: ['websocket'] // Ensure WebSocket is used
            });

            socket.on('connect', () => {
                status.textContent = "Status: Connected";
                messagesDiv.innerHTML += "<p>Connected to WebSocket server!</p>";
            });

            socket.on('disconnect', () => {
                status.textContent = "Status: Disconnected";
                messagesDiv.innerHTML += "<p>Disconnected from WebSocket server!</p>";
            });

            socket.on('message', (data) => {
                messagesDiv.innerHTML += `<p>Message: ${data}</p>`;
            });
        });

        document.getElementById('disconnectBtn').addEventListener('click', () => {
            if (socket) {
                socket.disconnect();
            }
        });
    </script>
</body>
</html>
