import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import requestAndResponseLogger from './middleware/requestAndResponseLogger';
import connectMongodb from './db/mongoConnection';
import loginRoute from './route/login';
import signIn from './route/signup';
import twite from './route/twite';

const app: Application = express();
connectMongodb();
app.use(cors());
app.use(express.json());
app.use(requestAndResponseLogger);
app.use('/api/auth', loginRoute, signIn);
app.use('/api/twite', twite);
app.use((err: Error, req: Request, res: Response, next: NextFunction) : void=> {
	if (err) {
		console.log(err, 'error');
		res.json({
			message: 'internal server error',
		});
	}
});
app.listen(8080, (err)=> {
	if (err) console.error(err); // eslint-disable-line no-console
	console.log('Server connected && running ... '); // eslint-disable-line no-console
});
