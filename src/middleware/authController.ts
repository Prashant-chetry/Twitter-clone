import {Response, Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export default function(req: Request, res: Response, next: NextFunction): void {
	const header: string = req.headers.authorization || '';
	const token: string = header.replace('Bearer Token', '')?.trim();
	if (!token) res.status(401).json('user not authorized');
	const userToken: string = JSON.stringify(jwt.verify(token, 'twitterclone'));
	if (!userToken) res.status(401).json('user not authorized');
	req.body.auth = JSON.parse(userToken);
	next();
}
