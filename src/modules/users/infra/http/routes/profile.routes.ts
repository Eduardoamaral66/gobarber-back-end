import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const controller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', controller.show);
profileRouter.post('/', controller.update);

export default profileRouter;
