import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from './config/db.js';

dotenv.config();


// Import routes
import authRoutes from './routes/auth.js'; 
import userRoutes from './routes/users.js';
import pantryRoutes from './routes/pantry.js';
import mealPlanRoutes from './routes/mealPlans.js';
import shoppingListRoutes from './routes/shoppingList.js';
import recipeRoutes from './routes/recipes.js';


const app = express();

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL
];

console.log("allowedOrigins",allowedOrigins)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    // allow exact + all Netlify preview subdomains
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".netlify.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/shopping-list',shoppingListRoutes);



const connectDB = async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error(error.message);
  }
};

connectDB();


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Enviroment ${process.env.NODE_ENV || "developement"} `);
});