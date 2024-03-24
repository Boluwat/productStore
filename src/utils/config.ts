import * as dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET || '',
    databaseUrl: process.env.DB_URI || '',
    serverUrl: process.env.SERVER_URL || `localhost:${ process.env.PORT}`,
   
}

export default config;