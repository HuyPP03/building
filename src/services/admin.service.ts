import { PERMISSION_ERROR } from '../constants/constants';
import { db } from '../loaders/database.loader';
import { Users } from '../models/users.model';
import { AppError } from '../utility/appError.util';
import { EncUtil } from '../utility/encryption';

export async function register(
	name: string,
	email: string,
	password: string,
): Promise<Users> {
	const user = await db.users.findOne({ where: { email: email } });
	if (user) {
		throw new AppError(PERMISSION_ERROR, 'User already exists');
	}
	const hashPassword = await EncUtil.createHash(password);
	const newUser =
		user ||
		(await db.users.create({
			name,
			email,
			password: hashPassword,
			role: 0,
		}));
	return newUser;
}

export const getUsers = async () => {
	const users = await db.users.findAll({
		attributes: ['id', 'name', 'email', 'role'],
	});
	return users;
};

export const updateUser = async (
	id: number,
	name: string,
	email: string,
	password: string,
	role: number,
) => {
	const hashPassword = await EncUtil.createHash(password);
	const user = await db.users.update(
		{
			name,
			email,
			password: hashPassword,
			role,
		},
		{
			where: {
				id,
			},
		},
	);
	return user;
};

export const deleteUser = async (id: number) => {
	const user = await db.users.destroy({
		where: {
			id,
		},
	});
	return user;
};

//fee

export const addFee = async (
	type: string,
	description: string,
	price: number,
) => {
	const newFee = await db.fees.create({
		type,
		description,
		price,
	});
	return newFee;
};

export const updateFee = async (
	id: number,
	type: string,
	description: string,
	price: number,
) => {
	const newFee = await db.fees.update(
		{
			type,
			description,
			price,
		},
		{
			where: {
				id,
			},
		},
	);
	return newFee;
};

export const deteleFee = async (id: number) => {
	const newFee = await db.fees.destroy({
		where: {
			id,
		},
	});
	return newFee;
};

export const addVehicleType = async (name: string, monthlyFee: number) => {
	const newVehicleType = await db.vehicleTypes.create({
		name,
		monthlyFee,
	});
	return newVehicleType;
};

export const updateVehicleType = async (
	id: number,
	name: string,
	monthlyFee: number,
) => {
	const newVehicleType = await db.vehicleTypes.update(
		{
			name,
			monthlyFee,
		},
		{
			where: {
				id,
			},
		},
	);
	return newVehicleType;
};

export const deteleVehicleType = async (id: number) => {
	const newVehicleType = await db.vehicleTypes.destroy({
		where: {
			id,
		},
	});
	return newVehicleType;
};
