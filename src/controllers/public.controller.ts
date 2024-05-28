import { NextFunction, Request, Response } from 'express';
import * as publicServices from '../services/public.service';
import { DataResponse } from '../interfaces/response.interface';

export const getFees = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const fees = await publicServices.getFees();
		return res.status(200).json(new DataResponse(0, fees, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getVehicleTypes = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const vehicleTypes = await publicServices.getVehicleTypes();
		return res.status(200).json(new DataResponse(0, vehicleTypes, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getHouseholds = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const households = await publicServices.getHouseholds();
		return res.status(200).json(new DataResponse(0, households, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const household = await publicServices.getHousehold(id);
		return res.status(200).json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getVoluntaryContributions = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const voluntaryContributions =
			await publicServices.getVoluntaryContributions();
		return res
			.status(200)
			.json(new DataResponse(0, voluntaryContributions, 'OK'));
	} catch (error) {
		next(error);
	}
};
