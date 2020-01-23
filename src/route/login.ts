import {Response, Request, Router} from 'express';
import {Users} from '../db/collections/users';
import Token from '../db/class/Token';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router: Router = Router(); // eslint-disable-line new-cap

router.post('/login', async(req: Request, resp: Response) : Promise<void> => {
	const {email, password, phone}: {email: string, password: string, phone: string} = req.body;
	const doc = await Users.findOne({'email': {$elemMatch: {address: email}}});
	if (doc && Object.keys(doc || {})?.length) {
		const match = await bcrypt.compare(password, (doc?.password || ''));
		if (!match) throw new Error('password does not match');
		const token = jwt.sign({_id: doc?._id, createdAt: new Date}, 'twitterclone');
		doc.tokens = [...(doc?.tokens || []), new Token(token)];
		doc?.save();
		resp.json({data: doc});
	}
});
export default router;
