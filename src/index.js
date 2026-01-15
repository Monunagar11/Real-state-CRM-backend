import dotenv from "dotenv";
import connect from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5000;

app.get("/api", (req,res)=>{
    return res.json("hello")
})

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port :${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting the DB"+ error);
  });
