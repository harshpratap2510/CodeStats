import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";  
import cors from "cors";
import cookieParser from "cookie-parser"; 
import path from "path"; // For serving static files
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

console.log("Hello from the backend!");
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173","https://code-stats-rose.vercel.app"],
  credentials: true,
}));
// app.use('/uploads', express.static(path.join(path.resolve(__dirname), 'uploads')));

app.use("/api/v1/users",userRoutes); 
app.use("/api/v1/admin",adminRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});