import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Produto } from '../../dtos/Produto';
import { alertService } from '../../services/AlertService';
import './CadastrarProduto.css'

export function CadastrarProduto() {
	const [showMessage, setShowMessage] = useState(false);
	const [formData, setFormData] = useState<Produto>(new Produto());
	const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: formData });
	const [preco, setPreco] = useState<number>(0);

	const produtoService = new ProdutoService();

	function onSubmit(data: any) {
		setFormData(data);
		setShowMessage(true);
		salvarProduto(data);
		reset();
	}

	function salvarProduto(produto: Produto) {
		produto.preco = preco;
		produtoService.save(produto)
			.then(res => {
				alertService.success(res.message);
			})
			.catch(erro => {
				alertService.error(erro.message);
			})
	}


	function onChangeField(field: string, value: any) {
		formData[field] = value;
		setFormData(formData);
	}

	function getFormErrorMessage(name: string) {
		return errors[name] && <small className='p-error'>{errors[name].message}</small>
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Container>
				<Row><h1>Cadastrar Produto</h1></Row>
				<Row>
					<Col xs={6}>
						<div className='field'>
							<label htmlFor='name'>Nome*</label>
							<span className='p-float-label' >
								<Controller name='nome' control={control} rules={{ required: 'Nome obrigatório.' }} render={({ field, fieldState }) => (
									<InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
								)} />
							</span>
							{getFormErrorMessage('nome')}
						</div>
						<div className='field'>
							<label htmlFor='preco'>Preço*</label>
							<CurrencyInput required min={0} onChange={(e) => setPreco(e.target.value)} className={'campo-preco'} />
						</div>
						<div className='field'>
							<label htmlFor='codigo'>Código*</label>
							<span className='p-float-label' >
								<Controller name='codigo' control={control} rules={{ required: 'Código obrigatório.' }} render={({ field, fieldState }) => (
									<InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
								)} />
							</span>
							{getFormErrorMessage('codigo')}
						</div>
						<div className='field'>
							<label htmlFor='embalagem'>Embalagem*</label>
							<span className='p-float-label' >
								<Controller name='embalagem' control={control} rules={formData.codigo ? { required: 'Embalagem obrigatório.' } : null} render={({ field, fieldState }) => (
									<InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
								)} />
							</span>
							{getFormErrorMessage('embalagem')}
						</div>
						<div className='field'>
							<label htmlFor='multiplo'>Múltiplo*</label>
							<span className='p-float-label' >
								<Controller name='multiplo' control={control} rules={{ required: 'Múltiplo obrigatório.' }} render={({ field, fieldState }) => (
									<InputText id={field.name} {...field} type='number' className={classNames({ 'p-invalid': fieldState.invalid })} />
								)} />
							</span>
							{getFormErrorMessage('multiplo')}
						</div>
						<div className='field'>
							<label htmlFor='ipi'>IPI*</label>
							<span className='p-float-label' >
								<Controller name='ipi' control={control} render={({ field, fieldState }) => (
									<InputText id={field.name} {...field} type='number' className={classNames({ 'p-invalid': fieldState.invalid })} />
								)} />
							</span>
							{getFormErrorMessage('ipi')}
						</div>

					</Col>
				</Row>
				<Row>
					<Col>
						<div className="field">
							<Button label='Cadastrar' className='p-button-success mr-2' type='submit' />
						</div>
					</Col>
				</Row>
			</Container>
		</form>
	)
}

import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { PedidoService } from '../../services/PedidoService';
import { ProdutoService } from '../../services/ProdutoService';

const defaultMaskOptions = {
	prefix: '',
	suffix: '',
	includeThousandsSeparator: true,
	thousandsSeparatorSymbol: '.',
	allowDecimal: true,
	decimalSymbol: ',',
	decimalLimit: 2, // how many digits allowed after the decimal
	integerLimit: 7, // limit length of integer numbers
	allowNegative: false,
	allowLeadingZeroes: false,
}

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
	const currencyMask = createNumberMask({
		...defaultMaskOptions,
		...maskOptions,
	})

	return <MaskedInput mask={currencyMask} {...inputProps} />
}

CurrencyInput.defaultProps = {
	inputMode: 'numeric',
	maskOptions: {},
}

CurrencyInput.propTypes = {
	inputmode: PropTypes.string,
	maskOptions: PropTypes.shape({
		prefix: PropTypes.string,
		suffix: PropTypes.string,
		thousandsSeparatorSymbol: PropTypes.string,
		decimalSymbol: PropTypes.string,
		decimalLimit: PropTypes.string,
		integerLimit: PropTypes.number,
	}),
}

export default CurrencyInput
