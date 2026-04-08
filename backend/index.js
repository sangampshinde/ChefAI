import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get("/", async (req, res) => { 
//   res.send("Recipee app");
// });


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Enviroment ${process.env.NODE_ENV || "developement"} `);
});