import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
// import adminrouter from "./routes/adminrouter.js";

import baseRouter from "./routes/baserouter.js";
dotenv.config( );
const app = express();
app.use(cors());

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api",baseRouter);


export default app;