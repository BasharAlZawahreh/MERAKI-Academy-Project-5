import io from "socket.io-client";
let socket;
let connection_port = "http://localhost:5000";

socket = io(connection_port);

socket.on("connect", () => {
  console.log(`${socket.id} is connected`);

  socket.on("set_notification2", (data) => {
    console.log('data',data);
    localStorage.setItem('reservations')
  });
});

export default socket;
