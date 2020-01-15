export default class PhoneType {
	type: string;
	number: string;
	verified: boolean;
	constructor(type: string, number: string, verified: boolean = false) {
		this.type = type;
		this.number = number;
		this.verified = verified;
	}
}
