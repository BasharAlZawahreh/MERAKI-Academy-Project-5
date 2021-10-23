import io from "socket.io-client";
let socket;
let connection_port = "http://localhost:5000";

socket = io(connection_port);

socket.on("connect", () => {
  console.log(`${socket.id} is connected`);

  socket.on("set_notification3", (data) => {
    console.log("object",data)
    let arr = JSON.parse(localStorage.getItem("reservations")) || [];
    arr.length && localStorage.removeItem("reservations");
    console.log("arr2", arr);
    
  
    arr.push(data);
    localStorage.setItem("reservations", JSON.stringify(arr));
    console.log("arr1",data);
  });
});

export default socket;
