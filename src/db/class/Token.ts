/* eslint-disable no-mixed-spaces-and-tabs */
export default class Token {
	 token: string;
	 createdAt: Date;
	 constructor(token : string) {
	 	this.token = token;
	 	this.createdAt = new Date();
	 }
}
