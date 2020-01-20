import {Response, Request, Router} from 'express';
import {Users} from '../db/collections/users';
import Token from '../db/class/Token';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router: Router = Router();

router.post('/login', async(req: Request, resp: Response)=> {
	const {email, password, phone}: {email: string, password: string, phone: string} = req.body;
	const doc = await Users.findOne({'email': {$elemMatch: {address: email}}});
	if (doc && Object.keys(doc || {})?.length) {
		const match = await bcrypt.compare(password, (doc?.password || ''));
		if (!match) throw new Error('password does not match');
		const token = jwt.sign({_id: doc?._id, createdAt: new Date}, 'twiiterclone');
		doc.tokens = [...(doc?.tokens || []), new Token(token)];
	doc?.save();
	resp.json(doc);
	}
});
export default router;
