import io from "socket.io-client";
let socket;
let connection_port = "/";

socket = io(connection_port);

socket.on("connect", () => {
  console.log(`${socket.id} is connected`);

  socket.on("set_notification3", (data) => {
    console.log("object",data)
    let arr = JSON.parse(localStorage.getItem("reservations")) || [];
    arr.length && localStorage.removeItem("reservations");
    
    arr.push(data);
    localStorage.setItem("reservations", JSON.stringify(arr));
  });
});

export default socket;
