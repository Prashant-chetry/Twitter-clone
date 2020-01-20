import express, {Application, Response, Request, NextFunction} from 'express';
import cors from 'cors';
import requestAndResponseLogger from './middleware/requestAndResponseLogger';
import {IUserModel, Users} from './db/collections/users';
import {Types} from 'mongoose';
import connectMongodb from './db/mongoConnection';
import PhoneType from './db/class/phoneType';
import EmailType from './db/class/emailType';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from './db/class/Token';
import loginRoute from './route/login';

const app: Application = express();
connectMongodb();
app.use(cors());
app.use(express.json());
app.use(requestAndResponseLogger);
app.use(loginRoute);
app.post('/signin', async(req: Request, res: Response)=> {
	const {email, passwordOne, passwordTwo, phone}:
	{email: string, passwordOne: string, passwordTwo: string, phone: string}
	= req.body;
	try {
		const doc = await Users.findOne({email: {$elemMatch: {address: email}}});
		console.log(doc);
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
		let token = jwt.sign({_id: user._id, createdAt: new Date()}, 'twiiterclone');
		user.tokens = [new Token(token)];
		user.save();
		res.json(user);
	}
	catch (err) {console.log(err); res.json(JSON.stringify(err)); throw new Error(err);}
});

app.listen(8080, (err)=> {
	if (err) console.error(err); // eslint-disable-line no-console
	console.log('Server connected && running ... '); // eslint-disable-line no-console
});
