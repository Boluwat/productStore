import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./utils/swagger.config";
import { routes } from "./routes";
import connectToDatabase from "./utils/database";
import config from "./utils/config";
import logger from "./utils/logger";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(helmet());
app.use(cors());
app.use(express.json());

routes(app);


const port = config.port;

const server = app.listen(port, () => {
  connectToDatabase();
  logger.info(`server is runnig on port ${port}`);
});

export { server, app };
