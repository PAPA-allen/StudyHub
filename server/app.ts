import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

export default app;