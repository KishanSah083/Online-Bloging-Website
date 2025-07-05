// db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load values from .env

const connectToDatabase = async () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    const URL = `mongodb+srv://${username}:${password}@cluster0.8rh1lwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const connectWithRetry = () => {
        console.log('MongoDB connection with retry');
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('✅ Database is connected');
            })
            .catch(error => {
                console.log('❌ MongoDB connection unsuccessful, retry after 5 seconds.\n', error);
                setTimeout(connectWithRetry, 5000);
            });
    };

    connectWithRetry();
};

export default connectToDatabase;
