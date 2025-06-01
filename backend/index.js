import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authrouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.route.js";
import connectionRouter from "./routes/connection.route.js";
import http from 'http';
import { Server } from "socket.io";
import { Socket } from "dgram";
import notificationRouter from "./routes/notification.route.js";
dotenv.config();
const app = express();
const server = http.createServer(app)
const allowedOrigins = [
  "http://localhost:5173",
  "https://linkdlclone-frontend-n3dn.onrender.com"
];

export const io = new Server(server,{
 cors: {
    origin: [
      "http://localhost:5173",
      "https://linkdlclone-frontend-n3dn.onrender.com"
    ],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true
  }
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


const port = process.env.PORT || 3000;

app.use("/api/auth", authrouter);
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/connection',connectionRouter)
app.use('/api/notification',notificationRouter)

app.get("/", (req, res) => {
  res.send("Hello World");
});
export const userSocketMap = new Map()
io.on("connection",(socket)=>{
  console.log('user connected',socket.id)
  socket.on('register',(userId)=>{
    userSocketMap.set(userId,socket.id)
  })
  socket.on("disconnect",(socket)=>{
        console.log('user disconnect',socket.id)
  })
})

server.listen(port, () => {
  connectdb();
  console.log(`Server is running on port ${port}`);
});
