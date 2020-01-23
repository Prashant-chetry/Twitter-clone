import {Response, Request, Router, NextFunction} from 'express';
import {Types} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../db/class/Token';
import EmailType from '../db/class/emailType';
import PhoneType from '../db/class/phoneType';
import {Users, IUserModel} from '../db/collections/users';
const router: Router = Router(); // eslint-disable-line new-cap

router.post( '/signup', async(req: Request, res: Response, next: NextFunction) : Promise<void> => {
	const {email, passwordOne, passwordTwo, phone}:
	{email: string, passwordOne: string, passwordTwo: string, phone: string}
	= req.body;
	try {
		const doc = await Users.findOne({email: {$elemMatch: {address: email}}});
		if (!Object.keys(doc || {}).length) {
			res.status(404).json('a user already exists');
			throw new Error('a user already exists');
		}
		const emailArray: EmailType[] = [new EmailType('p', email, true)];
		const phoneArray: PhoneType[] = [new PhoneType('p', phone, true)];
		if (passwordOne !== passwordTwo) throw new Error('password does not match');
		let user: IUserModel = new Users({_id: Types.ObjectId()}); // eslint-disable-line new-cap
		if (email) user.email = emailArray;
		if (phone) user.phone = phoneArray;
		user.password = await bcrypt.hash(passwordOne, 10);
		let token = jwt.sign({_id: user._id, createdAt: new Date()}, 'twitterclone');
		user.tokens = [new Token(token)];
		user.save();
		res.json({data: user});
	}
	catch (err) {next(err);}
});
export default router;
