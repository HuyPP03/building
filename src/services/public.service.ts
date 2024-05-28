import { db } from '../loaders/database.loader';
import { Fee_details } from '../models/fee_details.model';
import { Fees } from '../models/fees.model';
import { Residents } from '../models/residents.model';
import { Vehicle_details } from '../models/vehicle_details.model';
import { Vehicle_types } from '../models/vehicle_types.model';

export const getFees = async () => {
	const fees = await db.fees.findAll();
	return fees;
};

export const getVehicleTypes = async () => {
	const vehicleTypes = await db.vehicleTypes.findAll();
	return vehicleTypes;
};

export const getHouseholds = async () => {
	const households = await db.households.findAll({
		attributes: {
			exclude: ['phoneNumber'],
		},
	});
	return households;
};

export const getHousehold = async (id: number) => {
	const household = await db.households.findOne({
		where: { id },

		include: [
			{
				model: Fee_details,

				include: [
					{
						model: Fees,
					},
				],
			},
			{
				model: Residents,
				attributes: ['fullName', 'dateOfBirth'],
			},
			{
				model: Vehicle_details,
				include: [
					{
						model: Vehicle_types,
					},
				],
			},
		],
	});
	return household;
};

export const getVoluntaryContributions = async () => {
	const voluntaryContributions = await db.voluntaryContributions.findAll({
		include: [
			{
				model: db.residents,
				attributes: ['fullName', 'dateOfBirth'],
			},
		],
		group: ['voluntaryContributions.residentId', 'resident.id'],
		attributes: [
			'residentId',
			[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'totalAmount'],
		],
	});
	return voluntaryContributions;
};
