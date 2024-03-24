import mongoose from "mongoose";
import config from './config'
import logger from "./logger";

const dbUri = config.databaseUrl

export default async function connectToDatabase() {
    try {
        await mongoose.connect(dbUri);
        logger.info('database is connected!!!')
    } catch (err) {
        logger.error(`MongoDB connection error: ${err}`);
    }
}
