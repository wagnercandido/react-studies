import { filter, Subject } from 'rxjs';

const alertSubject = new Subject<PropsAlert>();

export const alertService = {
	onAlert,
	success,
	error,
	show,
}

export type PropsAlert = {
	type: string,
	title: string,
	message: string,
}

export const AlertTitle = {
	Success: 'Success',
	Error: 'Error',
	Info: 'Info',
	Warning: 'Warning'
}

function onAlert() {
	return alertSubject.asObservable().pipe();
}

function success(message: string) {
	show(message, AlertTitle.Success.toLocaleLowerCase(), AlertTitle.Success);
}

function error(message: string) {
	show(message, AlertTitle.Error.toLocaleLowerCase(), AlertTitle.Error);
}

function show(message: string, type: string, title: string) {
	alertSubject.next({ message, type, title });
}