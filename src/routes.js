import { Router } from 'express';

import BoardController from './app/controllers/BoardController';

const routes = Router();

routes.get('*', BoardController.show);

export default routes;
