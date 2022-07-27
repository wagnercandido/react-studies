export enum StatusEnum {
	ACTIVE = 'ACTIVE' , 
	INACTIVE = 'INACTIVE' 
}

export const StatusEnumMapper = {
	[StatusEnum.ACTIVE]: 'Active',
	[StatusEnum.INACTIVE]: 'Inactive',
}

export const StatusEnumOptions = [
	{ value: StatusEnum.ACTIVE, label: StatusEnumMapper[StatusEnum.ACTIVE] },
	{ value: StatusEnum.INACTIVE, label: StatusEnumMapper[StatusEnum.INACTIVE] },
]
