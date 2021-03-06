import {Model, Schema, model, Document} from 'mongoose';
import {IUser} from '../interface/users';
import {NextFunction} from 'express';

const nameSchema: Schema = new Schema({
	first: {
		type: String,
	},
	last: String,
	middle: String,
});
const emailSchema: Schema = new Schema({
	type: String,
	address: String,
	verified: Boolean,
});
const phoneSchema: Schema = new Schema({
	type: String,
	number: String,
	verified: Boolean,
});
const tokenSchema:Schema = new Schema({
	token: String,
	createdAt: Date,
});
const userSchema: Schema = new Schema({
	_id: Schema.Types.ObjectId,
	email: [emailSchema],
	name: {
		type: nameSchema,
	},
	password: {
		type: String,
		required: true,
		min: 4,
		max: 100,
	},
	phone: [phoneSchema],
	pincode: String,
	address: String,
	tokens: [tokenSchema],
	createdAt: Date,
	createdBy: Schema.Types.ObjectId,
	updatedAt: Date,
	updatedBy: Schema.Types.ObjectId,
});
userSchema.pre('save', function(next: NextFunction): void{
	const user = this;
	if (user.isNew) {
		const date = new Date();
		//update createdat createdBy and updatedAt updatedBy
	}
	next();
});
export interface IUserModel extends IUser, Document{}
export const Users: Model<IUserModel> = model<IUserModel>('User', userSchema);
