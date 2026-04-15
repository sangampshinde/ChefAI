import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


// Import routes
import authRoutes from './routes/auth.js'; 
import userRoutes from './routes/users.js';


const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get("/", async (req, res) => { 
//   res.send("Recipee app");
// });


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users',userRoutes);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Enviroment ${process.env.NODE_ENV || "developement"} `);
});