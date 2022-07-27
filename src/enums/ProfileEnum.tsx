export enum ProfileEnum {
	ADMIN = 'ADMIN',
	DEFAULT = 'DEFAULT',
	COSTUMER = 'COSTUMER'
}

export const ProfileEnumMapper = {
	[ProfileEnum.ADMIN]: 'Administrator',
	[ProfileEnum.DEFAULT]: 'Default',
	[ProfileEnum.COSTUMER]: 'Costumer',
}

export const ProfileEnumOptions = [
	{ value: ProfileEnum.ADMIN, label: ProfileEnumMapper[ProfileEnum.ADMIN] },
	{ value: ProfileEnum.DEFAULT, label: ProfileEnumMapper[ProfileEnum.DEFAULT] },
	{ value: ProfileEnum.COSTUMER, label: ProfileEnumMapper[ProfileEnum.COSTUMER] },
]
