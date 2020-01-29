import {Request, Response, Router, NextFunction} from 'express';
import authController from '../middleware/authController';
import {IUserModel, Users} from '../db/collections/users';
import {Twites} from '../db/collections/twites';
import {Types} from 'mongoose';
import {IUser} from '../db/interface/users';

const router: Router = Router(); // eslint-disable-line new-cap

router.post('/twiter', authController, async(req: Request, res: Response, next: NextFunction) : Promise<void> =>{
	const {auth, twite}: {auth: IUserModel, twite: string} = req.body;
	if (!auth._id) {
		res.status(401).json('not logged in.');
	}
	const user = await Users.findById({_id: auth._id});
	if (!user) res.json('user doesnot exists');
	try {
		const doc = new Twites({_id: Types.ObjectId()}); // eslint-disable-line new-cap
		doc.createdBy = user?._id;
		doc.updateBy = user?._id;
		doc.twite = twite;
		doc.save();
		res.json({data: doc});
	}
	catch (err) {
		next(err);
	}
});
router.get('/twiter/:id', authController, async(req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {id} = req.params;
	try {
		const doc = await Twites.findById({_id: id});
		if (!Object.keys(doc || {})?.length) res.status(500).json('twite doesnot exists');
		res.json({data: doc});
	}
	catch (err) {next(err);}
});
router.get('/all/twiter', authController, async(req: Request, res: Response, next: NextFunction): Promise<void> => {
	const filters: object = req.query;
	try {
		const doc = await Twites.find({...filters});
		res.json({data: doc});
	}
	catch (err) {next(err);}
});
router.delete('/twiter/:id', authController, async(req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {id} = req.params;
	try {
		const doc = await Twites.findByIdAndDelete({_id: id});
		if (!Object.keys(doc || {})?.length) res.status(200).json('twite was deleted');
	}
	catch (err) {next(err);}
});
export default router;
