const stripe=require("stripe")(process.env.STRIPE_KEY)

const Pay=(req,res)=>{
  console.log(req.body);
    stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: parseInt(req.body.amount),
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            console.log("back1",stripeErr);
           return  res.status(500).json(stripeErr);

          } else {
            console.log("back",stripeRes);
           return res.status(200).json(stripeRes);
          }
        }
      );
}
module.exports={Pay}