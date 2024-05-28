import { Router } from 'express';
import { isAdmin, verifyToken } from '../middleware/authenticate.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { registerSchema } from '../validators/auth.validator';
import * as adminControllers from '../controllers/admin.controller';

const router = Router();

router.post(
	'/register',
	validateBody(registerSchema),
	verifyToken,
	isAdmin,
	adminControllers.register,
);

router.use(verifyToken, isAdmin);

router.get('/users', adminControllers.getUsers);
router.put('/users/:id', adminControllers.updateUser);
router.delete('/users/:id', adminControllers.deleteUser);

router.post('/fee', adminControllers.addFee);
router.put('/fee/:id', adminControllers.updateFee);
router.delete('/fee/:id', adminControllers.deleteFee);

router.post('/vehicle-type', adminControllers.addVehicleType);
router.put('/vehicle-type/:id', adminControllers.updateVehicleType);
router.delete('/vehicle-type/:id', adminControllers.deleteVehicleType);

export default router;
