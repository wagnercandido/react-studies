import { formatDistanceToNowStrict } from "date-fns";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from "primereact/datatable";
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { User } from "../../dtos/User";
import { ProfileEnum, ProfileEnumMapper } from "../../enums/ProfileEnum";
import { StatusEnum, StatusEnumMapper } from "../../enums/StatusEnum";
import { alertService } from "../../services/AlertService";
import { FormUser } from "../form-user/FormUser";


export function PageTable(): JSX.Element {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [selectedUserEdit, setSelectedUserEdit] = useState<User>();
	const [visibleUserDialog, setVisibleDialog] = useState<boolean>(false);

	const actionTableTemplate = (user: User) => {
		return (
			<React.Fragment>
				<Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(user)} />
				<Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirm(user)} />
			</React.Fragment>
		)
	}

	const dateTableTemplate = (user: User) => {
		return (
			<span>
				{`há ${user.createdAt ? formatDistanceToNowStrict(user.createdAt) : ''}`}
			</span>
		)
	}

	const mapSatusTable = (user: User) => {
		return (
			<span>{StatusEnumMapper[user.status ? user.status : StatusEnum.ACTIVE]}</span>
		)
	}

	const mapProfileTable = (user: User) => {
		return (
			<span>{ProfileEnumMapper[user.profile ? user.profile : ProfileEnum.ADMIN]}</span>
		)
	}

	useEffect(() => {
		// TODO add setUsers to updateTable here
	})

	function openDialogUser(acao: boolean) {
		setVisibleDialog(acao);
	}

	function addUser(user: User) {
		const param = new Date();
		user.id = param.getTime();
		user.createdAt = param;
		setUsers([...users, user]);
		alertService.success('User added');
	}

	function editUser(user: User) {
		setSelectedUserEdit(user);
		openDialogUser(true);
	}

	function updateTable(user: User) {
		if (selectedUserEdit && selectedUserEdit.id) {
			const index = users.findIndex(userList => userList.id === user.id)
			users[index] = user;
			setUsers([...users]);
			setSelectedUserEdit(undefined);
			alertService.success('User updated');
			return;
		}
		addUser(user);
	}

	function removeListUser() {
		let usersCopy = [...users];
		selectedUsers.forEach(user => {
			usersCopy = usersCopy.filter(u => u.id !== user.id);
		});
		setUsers([...usersCopy]);
		alertService.error('Users deleteds');
	}
	
	function removeUser(user: User) {
		const usersCopy = users.filter(u => u.id !== user.id);
		setUsers([...usersCopy]);
		alertService.error('User deleted');
	}

	function confirm(user?: User) {
		confirmDialog({
			message: 'Are you sure you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => user && user.id ? removeUser(user) : removeListUser(),
			// reject: () => 
		});
	}

	return (
		<>
			<ConfirmDialog />

			<Container>
				<h1>Users</h1>

				<Card>
					<Card.Body>
						<React.Fragment>
							<Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={() => openDialogUser(true)} />
							<Button label="Delete" icon="pi pi-trash" className="p-button-danger" disabled={!selectedUsers.length} onClick={() => confirm()} />
						</React.Fragment>
					</Card.Body>
				</Card>

				<Card.Body>
					<DataTable value={users} stripedRows
						selection={selectedUsers} onSelectionChange={(u) => setSelectedUsers(u.value)}
					>
						<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
						<Column field="id" header="Code"  ></Column>
						<Column field="name" header="Name"  ></Column>
						<Column field="userName" header="Username"  ></Column>
						<Column body={mapProfileTable} header="Profile" > </Column>
						<Column body={dateTableTemplate} header="CreatedAt"  ></Column>
						<Column body={mapSatusTable} header="Status"  ></Column>
						<Column body={actionTableTemplate}  ></Column>
					</DataTable>
				</Card.Body>
			</Container>

			<Dialog header="Form User" style={{ width: '450px' }} visible={visibleUserDialog} onHide={() => { setVisibleDialog(false); setSelectedUserEdit(undefined); }} modal className="p-fluid">
				<FormUser user={selectedUserEdit} onSubmitUser={(user: User) => { updateTable(user); setVisibleDialog(false); }} />
			</Dialog>
		</>
	)
}