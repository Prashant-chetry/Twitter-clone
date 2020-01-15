import express, {Application, Response, Request, NextFunction} from 'express';
import cors from 'cors';
import requestAndResponseLogger from './middleware/requestAndResponseLogger';
import Users, {IUserModel} from './db/collections/users';
import {Types} from 'mongoose';
import connectMongodb from './db/mongoConnection';
import PhoneType from './db/class/phoneType';
import EmailType from './db/class/emailType';
import bcrypt from 'bcrypt';

const app: Application = express();
connectMongodb();
app.use(cors());
app.use(express.json());
app.use(requestAndResponseLogger);
app.post('/signin', async(req: Request, res: Response)=> {
	const {email, passwordOne, passwordTwo, phone}:
	{email: string, passwordOne: string, passwordTwo: string, phone: string}
	= req.body;
	try {
		const doc = await Users.find({email: {$elemMatch: {address: email}}});
		if (Object.keys(doc).length) throw new Error('a user already exists');
		const emailArray: EmailType[] = [new EmailType('p', email, true)];
		const phoneArray: PhoneType[] = [new PhoneType('p', phone, true)];
		if (passwordOne !== passwordTwo) throw new Error('password does not match');
		let user: IUserModel = new Users({_id: Types.ObjectId()}); // eslint-disable-line new-cap
		if (email) user.email = emailArray;
		if (phone) user.phone = phoneArray;
		user.password = await bcrypt.hash(passwordOne, 10);
		user.save();
		res.json(user);
	}
	catch (err) {res.json(JSON.stringify(err)); throw new Error(err);}
});
app.listen(8080, (err)=> {
	if (err) console.error(err); // eslint-disable-line no-console
	console.log('Server connected && running ... '); // eslint-disable-line no-console
});
