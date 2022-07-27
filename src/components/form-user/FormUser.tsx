import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../dtos/User';
import { ProfileEnumOptions } from '../../enums/ProfileEnum';
import { StatusEnum, StatusEnumOptions } from '../../enums/StatusEnum';

export function FormUser({ user, onSubmitUser }: any) {
	const [showMessage, setShowMessage] = useState(false);
	const [formData, setFormData] = useState<User>(user && user.id ? user : new User());
	const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: formData });

	function onSubmit(data: any) {
		setFormData(data);
		setShowMessage(true);

		onSubmitUser(data);
		reset();
	}

	function onChangeField(field: string, value: any) {
		formData[field] = value;
		setFormData(formData);
	}

	function getFormErrorMessage(name: string) {
		return errors[name] && <small className='p-error'>{errors[name].message}</small>
	};

	const radioStatusOptions = () => {
		return (
			<React.Fragment>
				<Row>
					<Controller name='status' control={control} rules={{ required: 'Status is required.' }} render={({ field }) => (
						<>
							{StatusEnumOptions.map(radio => {
								return <Col key={radio.value}>
									<RadioButton type='radio' inputId={radio.value} value={radio.value} onChange={(e) => { onChangeField('status', e.value); field.onChange(e.value) }}
										checked={formData.status === radio.value}></RadioButton>
									<label style={{ marginLeft: '5px' }} htmlFor={radio.value}> {radio.label}</label>
								</Col>
							})}
						</>
					)}
					/>
				</Row>
			</React.Fragment >
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Container>
				<div className='field' style={{ padding: '1.5rem 0 0 0' }}>
					<span className='p-float-label' >
						<Controller name='name' control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
							<InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
						)} />
						<label htmlFor='name'>Name*</label>
					</span>
					{getFormErrorMessage('name')}
				</div>
				<div className='field' style={{ padding: '1.5rem 0 0 0' }}>
					<span className='p-float-label' >
						<Controller name='userName' control={control} rules={{ required: 'Usernmae is required.' }} render={({ field, fieldState }) => (
							<InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
						)} />
						<label htmlFor='userName'>Username*</label>
					</span>
					{getFormErrorMessage('userName')}
				</div>
				<div className='field' style={{ padding: '1.5rem 0 0 0' }}>
					<span className='p-float-label' >
						<Controller name='password' control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
							<InputText id={field.name} type='password' {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
						)} />
						<label htmlFor='password'>Password*</label>
					</span>
					{getFormErrorMessage('password')}
				</div>
				<div className='field' style={{ padding: '1.5rem 0 0 0' }}>
					<span className='p-float-label' >
						<Controller name='profile' control={control} rules={{ required: 'Profile is required.' }} render={({ field, fieldState }) => (
							<Dropdown id={field.name} options={ProfileEnumOptions} optionLabel='label' optionValue='value' value={field.value}
								onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} />
						)} />
						<label htmlFor='profile'>Profile*</label>
					</span>
					{getFormErrorMessage('profile')}
				</div>
				<div className='field' style={{ padding: '.5rem 0 0 0' }}>
					<span className='p-float-label' >
						{radioStatusOptions()}
					</span>
					{getFormErrorMessage('status')}
				</div>
				<div className='field' style={{ padding: '.5rem 0 1rem 0' }}>
					<span className='p-float-label' >
						<Controller name='acceptTerms' control={control} rules={{ required: 'acept is required.' }} render={({ field, fieldState }) => (
							<Checkbox inputId={field.name} checked={field.value} onChange={(event) => { field.onChange(event.checked) }} />
						)} />
						<label style={{ marginLeft: '20px' }} htmlFor='acceptTerms' className={classNames({ 'p-error': errors.acceptTerms })}>I agree to the terms and conditions*</label>
					</span>
				</div>

				<Button label='Submit' className='p-button-success mr-2' type='submit' />
			</Container>
		</form>
	)
}
