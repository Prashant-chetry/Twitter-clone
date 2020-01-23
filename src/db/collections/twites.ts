import {Document, Model, model, Schema} from 'mongoose';
import {ITwites} from '../interface/twites';

const twiteSchema = new Schema({
	twite: {
		type: String,
		max: 100,
		min: 1,
		trim: true,
		required: true,
	},
	createdAt: {
		type: Date,
		default: ()=> new Date,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	updatedAt: {
		type: Date,
		default: ()=> new Date,
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export interface ITwitesModal extends ITwites, Document{}

export const Twites: Model<ITwitesModal> = model<ITwitesModal>('Twites', twiteSchema);
