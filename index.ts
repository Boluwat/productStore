import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./src/utils/swagger.config";
import { routes } from "./src/routes";
import connectToDatabase from "./src/utils/database";
import config from "./src/utils/config";
import logger from "./src/utils/logger";

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
