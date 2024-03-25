import { Application } from "express";
import BoostrapServer from "./utils/bootstrap";
import connectToDatabase from "./utils/database";
import config from "./utils/config";
import logger from "./utils/logger";


export const app: Application = BoostrapServer();

const port = config.port;

const server = app.listen(port, () => {
  connectToDatabase();
  logger.info(`server is runnig on port ${port}`)
});

export { server };
