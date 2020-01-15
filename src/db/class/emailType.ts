/* eslint-disable no-mixed-spaces-and-tabs */
export default class EmailType {
 type: string;
 address: string;
 verified: boolean;
 constructor(type: string, address: string, verified: boolean = false) {
	 this.type = type;
	 this.address = address;
	 this.verified = verified;
 }
}
