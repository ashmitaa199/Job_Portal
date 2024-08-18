import express from "express";
import {config} from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import {connection} from "./database/connection.js"
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";

const app = express();
config({path: "./config/config.env"})

app.use(cors({
    origin: [process.env.FRONTEND_URI], //app.use means we are using cors as a middleware
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

})
);   

//COOKIE-PARSER IS USED FOR WHEN WE LOGIN A USER A JWT TOKEN IS GENERATED AND IF WE WANR TO
// USE THAT TOKEN IS OUR FRONTEND THEN FOR THAT WE USE COOKIE PARSER

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));//these two are middle wares


//file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
})
);

app.use("/api/v1/user", userRouter);

connection();
app.use(errorMiddleware)

export default app;