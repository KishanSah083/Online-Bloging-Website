import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.delete('/follow', (req, res) => {
    // Handle unfollow logic here, e.g., update database, etc.
    const { username } = req.query; // Assuming username is passed as a query parameter
    
    // Example logic: Update database or perform action
    // For demonstration, just send a success message
    res.status(200).json({ message: `Successfully unfollowed user ${username}` });
});


const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));