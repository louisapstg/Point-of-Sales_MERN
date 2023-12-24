import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Middleware
app.use("/api/users", userRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Error Handler Middleware
app.use(errorHandler);

//Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    })
    .catch(err => {
        console.log(err);
    });