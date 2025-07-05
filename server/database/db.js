import mongoose from 'mongoose';

const connectToDatabase = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-n8hkbky-shard-00-00.8vwqnvt.mongodb.net:27017,ac-n8hkbky-shard-00-01.8vwqnvt.mongodb.net:27017,ac-n8hkbky-shard-00-02.8vwqnvt.mongodb.net:27017/?ssl=true&replicaSet=atlas-z0alro-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;

    const connectWithRetry = () => {
        console.log('MongoDB connection with retry');
        return mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Database is connected');
            })
            .catch(error => {
                console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', error);
                setTimeout(connectWithRetry, 5000);
            });
    };

    connectWithRetry();
};

export default connectToDatabase;
