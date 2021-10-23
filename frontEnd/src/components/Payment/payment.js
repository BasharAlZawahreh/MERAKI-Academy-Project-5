import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "react-bootstrap/Button";
import axios from "axios";
import socket from "../../socket";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
const Payment = ({ amount }) => {
  const state = useSelector((state) => {
    return { token: state.token.token };
  });
  const decodedToken = jwt(state.token);
  console.log("decodedToken", decodedToken);
  const [stripeToken, setStripeToken] = useState(null);
  const [message, setMessage] = useState("");
  const SendMessage = () => {
    const reserveContent = {
      amount,
      username: decodedToken.userName,
    };
    console.log("reserveContent", reserveContent);
    socket.emit("set_notification", reserveContent);
  };
  const KEY =
    "pk_test_51JmGKeKbP3md6iwKmNhMpoMdThc8BgleFnUw0cI1n1eGKCkRgOPHBSGDFuVBzXVaAMlsmVi8CqNaqOejDjtcBefj00iwrv2rao";
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/payment`, {
          tokenId: stripeToken.id,
          amount: parseInt(amount),
        });
        // history.push("/success", { data: res.data });
        setMessage("Success payment");
        // setReserv("set_notification")
        SendMessage();
        console.log("///////", res.data);
      } catch (err) {
        console.log("payment err", err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <>
      <StripeCheckout
        name="Auto Rental"
        //   image=""
        billingAddress
        shippingAddress
        description="description"
        amount={parseInt(amount * 10)}
        token={onToken}
        stripeKey={KEY}
      >
        <Button>CHECKOUT NOW</Button>
      </StripeCheckout>
      <p>{message}</p>
    </>
  );
};
export default Payment;
