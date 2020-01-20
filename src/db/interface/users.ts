/* eslint-disable no-mixed-spaces-and-tabs */
import {IUserModel} from '../collections/users';
import EmailType from '../class/emailType';
import PhoneType from '../class/phoneType';
import Token from '../class/Token';

export interface IUser{
	// _id: string,
	email: Array<EmailType>,
	password: string,
	phone?: Array<PhoneType>,
	name?: {full?: string, last?: string, middle?: string},
	pincode?: string,
	address?: string,
	createdAt?: Date,
	createdBy?: string,
	updatedAt?: Date,
	UpdatedBy?: string,
	tokens: Array<Token>,
}
