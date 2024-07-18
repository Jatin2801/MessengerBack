import mongoose from "mongoose";

const connettomongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, { // we have MONGO_DB_URI in .env file 
        });
            console.log('Connected To DB')
    } catch (error) {
        console.log('error connecting to DB', error.message);
    }
}

export default connettomongo;
