import { Router } from 'express';
import { verifyToken } from '../middleware/authenticate.middleware';
import * as managerControllers from '../controllers/manager.controller';

const router = Router();

router.use(verifyToken);

router.post('/household', managerControllers.addHousehold);
router.put('/household/:id', managerControllers.updateHousehold);
router.delete('/household/:id', managerControllers.deleteHousehold);

router.post('/fee-detail', managerControllers.addFeeDetail);
router.put('/fee-detail/:id', managerControllers.updateFeeDetail);
router.delete('/fee-detail/:id', managerControllers.deleteFeeDetail);

router.post('/vehicle-detail/:id', managerControllers.addVehicleDetail);
router.put('/vehicle-detail/:id', managerControllers.updateVehicleDetail);
router.delete('/vehicle-detail/:id', managerControllers.deleteVehicleDetail);

router.post('/resident', managerControllers.addResident);
router.put('/resident/:id', managerControllers.updateResident);
router.delete('/resident/:id', managerControllers.deleteResident);

router.post(
	'/voluntary-contribution',
	managerControllers.addVoluntaryContribution,
);
router.put(
	'/voluntary-contribution/:id',
	managerControllers.updateVoluntaryContribution,
);
router.delete(
	'/voluntary-contribution/:id',
	managerControllers.deleteVoluntaryContribution,
);

export default router;
