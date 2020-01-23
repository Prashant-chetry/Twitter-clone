import {Types} from 'mongoose';

export interface ITwites {
	twite: string,
	createdAt?: Date,
	createdBy?: Types.ObjectId,
	updatedAt?: Date,
	updateBy?: Types.ObjectId,
}
