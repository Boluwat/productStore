import express, {Application} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.config';
import { routes } from '../routes';

const BoostrapServer = (): Application => {
    const app = express();

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    routes(app)


    return app;
}

export default BoostrapServer;