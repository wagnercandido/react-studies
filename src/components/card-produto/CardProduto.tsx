import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const CardProduto: React.FC<any> = ({
	produto,
	selecionarProduto,
	isCarrinho = true,
	qtdProduto,
}) => {
	return (
		<Card key={produto._id} onClick={() => selecionarProduto(produto)} className="card-produto">
			<Row className='nome'>
				<h6>{produto.nome}</h6>
			</Row>
			<Row className='linha-secundaria'>
				<Col>Cod: {produto.codigo}</Col>
				<Col>Emb: {produto.embalagem}</Col>
			</Row>
			<Row className='linha-secundaria'>
				<Col>Múltiplo: {produto.multiplo}</Col>
				<Col>IPI: {produto.ipi}</Col>
			</Row>
			<Row >
				<Col className='preco'><h6>R$ {produto.preco.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h6></Col>
			</Row>
		</Card>
	);
};

export default CardProduto;