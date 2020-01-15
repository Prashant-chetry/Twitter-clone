/* eslint-disable no-mixed-spaces-and-tabs */
import {connect} from 'mongoose';
export default ()=> {
	try {
	 connect('mongodb://127.0.0.1:27017/twitterClone', {useNewUrlParser: true, useUnifiedTopology: true});
	 // eslint-disable-next-line no-console
	 console.log('mongodb connected...');
	}
	catch (err) {throw new Error(err);}
}
;
