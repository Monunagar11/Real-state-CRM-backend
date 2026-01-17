import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));

import userRoute from "./routers/user.router.js";
import leadRouter from "./routers/lead.router.js";
import clientRouter from "./routers/client.router.js";
import propertiesRouter from "./routers/property.router.js";

app.use("/api/v1/user",userRoute);
app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/properties", propertiesRouter);

export { app };