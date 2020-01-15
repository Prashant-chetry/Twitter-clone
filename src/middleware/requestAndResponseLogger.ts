import {Request, Response, NextFunction} from 'express';
export default (req: Request, resp: Response, next: NextFunction)=> {
	const {originalUrl, method}: {originalUrl: string, method: string} = req;
	const start: number = new Date().getTime();
	resp.on('finish', ()=> {
		const finished: number = new Date().getTime() - start;
		// eslint-disable-next-line no-console
		console.log(`Method: ${method}, url: ${originalUrl}, Time: ${finished}ms`);
	});
	next();
};
