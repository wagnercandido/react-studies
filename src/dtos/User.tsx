import { ProfileEnum } from '../enums/ProfileEnum';
import { StatusEnum } from '../enums/StatusEnum';

export class User {
	id: number;
	name = '';
	userName = '';
	password = '';
	profile: ProfileEnum;
	createdAt: Date;
	status: StatusEnum;
	acceptTerms = false;

	constructor() {
		const data = new Date();
		this.id = data.getTime();
		this.createdAt = data;
		this.status = StatusEnum.ACTIVE;
		this.profile = ProfileEnum.DEFAULT;
	}
}