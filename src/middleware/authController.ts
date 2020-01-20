import {Response, Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {IUserModel} from '../db/collections/users';
interface Req extends Request{
	// user: object,
	user: IUserModel
}
export default async function(req: Req, res: Response, next: NextFunction) {
	const header: string = req.headers.authorization || '';
	const token: string = header.replace('Bearer Token', '')?.trim();
	if (!token) res.status(401).json('user not authorized');
	const userToken: object | string = await jwt.verify(token, 'twitterclone');
	if (!userToken) res.status(401).json('user not authorized');
	if (typeof userToken === 'object') {
		// if (userToken?._id) {}
	}
}
