import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { Produto } from "../../dtos/Produto";
import { PedidoService } from "../../services/PedidoService";
import { ProdutoService } from "../../services/ProdutoService";
import CardProduto from '../card-produto/CardProduto';
import './Produtos.css';

type ResponsePagination = {
	config: object;
	data: {
		content: Produto[];
		totalItems: number;
		totalPages: number;
	}
}

type Response = {
	message: string;
	valorComImposto: number;
	valorSemImposto: number;
}

export function Produtos(): JSX.Element {
	const [produtos, setProdutos] = useState<Produto[]>([]);
	const [produtoSelecionado, setProdutoSelecionado] = useState<Produto>(new Produto());
	const [visibleDialogProduto, setVisibleDialogProduto] = useState<boolean>(false);
	const [visibleDialogCarrinho, setVisibleDialogCarrinho] = useState<boolean>(false);
	const [visibleDialogResposta, setVisibleDialogResposta] = useState<boolean>(false);
	const [carrinho, setCarrinho] = useState<Produto[]>([]);
	let [respostaPedido, setRespostaPedido] = useState<Response>(null);
	let [qtdProduto, setQtdProduto] = useState<number>(0);
	let [totalPedido, setTotalPedido] = useState<number>(0);
	let [pages, setPages] = useState<number[]>([]);
	let [page, setPage] = useState<number>(0);

	const produtoService = new ProdutoService();
	const pedidoService = new PedidoService();

	function buscarProdutos(pages: number = 0) {
		produtoService.findAll(pages).then((res: ResponsePagination) => {
			setProdutos(res.data.content);
			console.log('produtos', produtos);

			const paginas = Array.from(Array(res.data.totalPages).keys());
			setPages(paginas);
		});
	}

	useEffect(() => {
		buscarProdutos();
	}, []);

	useEffect(() => {
		calcularPedido();
	});

	function selecionarProduto(produto: Produto) {
		const produtoJaSelecionado = buscarProdutoSelecionado(produto);
		const qtd = produtoJaSelecionado ? produtoJaSelecionado.quantidade : produto.multiplo;
		produto.quantidade = qtd;

		setQtdProduto(qtd);
		setProdutoSelecionado(produto);
		exibirModalProduto(true);
	}

	function exibirModalProduto(acao: boolean) {
		setVisibleDialogProduto(acao);
	}

	function exibirModalCarrinho(acao: boolean) {
		setVisibleDialogCarrinho(acao);
	}

	function exibirModalResposta(acao: boolean, obj?: Response) {
		setRespostaPedido(obj);
		setVisibleDialogResposta(acao);
	}

	function somarQtdProdutoSelecionado(acao: boolean) {
		const qtd = produtoSelecionado.multiplo;
		qtdProduto = acao ? qtdProduto + qtd : qtdProduto - qtd;
		qtdProduto = qtdProduto < 0 ? 0 : qtdProduto;
		setQtdProduto(qtdProduto);

		produtoSelecionado.quantidade = qtdProduto;
		setProdutoSelecionado(produtoSelecionado);
	}

	function adicionarProduto(produto: Produto) {
		if (produto.quantidade === 0) {
			removerProduto();
			return;
		}
		const indiceProduto = carrinho.map(p => p._id).indexOf(produto._id);
		if (indiceProduto >= 0) {
			carrinho[indiceProduto] = produto;
			setCarrinho(carrinho);
			return;
		}
		setCarrinho([...carrinho, produto]);
	}

	function removerProduto() {
		const lista = carrinho.filter(p => p._id !== produtoSelecionado._id);
		setCarrinho(lista);
	}

	function calcularPedido() {
		let total = 0;
		carrinho.forEach(prod => {
			total = total + ((prod.preco + (prod.preco * (prod.ipi / 100))) * prod.quantidade);
		});

		setTotalPedido(total);
	}

	function buscarProdutoSelecionado(produto: Produto) {
		return carrinho.find(p => p._id === produto._id);
	}

	function enviarPedido() {
		pedidoService.send(carrinho).then(res => {
			setCarrinho([]);
			calcularPedido();
			setVisibleDialogCarrinho(false);
			exibirModalResposta(true, res.data);

		}).catch(erro => {
			console.log('erro', erro);
		});
	}

	function onPageChange(page: number) {
		setPage(page);
		buscarProdutos(page);
	}

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Produtos</h1>
					</Col>
					<Col style={{ textAlign: 'right' }}>
						<Button label={`Carrinho R$ ${totalPedido.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`} icon="pi pi-shopping-cart" className="p-button-rounded p-button-success mr-2" onClick={() => { exibirModalCarrinho(true) }} />
					</Col>
				</Row>
				<Row style={{ marginTop: '10px' }}>
					{
						produtos.map(produto => {
							return <Col md={6}>
								<CardProduto produto={produto} selecionarProduto={selecionarProduto}></CardProduto>
							</Col>
						})
					}

				</Row>

				<Row>
					<Pagination size="lg" className="d-flex justify-content-center">
						<Pagination.Prev disabled={page === pages[0]} onClick={() => onPageChange(page - 1)} />
						{pages.map(p => {
							return <Pagination.Item active={p === page} onClick={() => onPageChange(p)}>{String(p + 1)}</Pagination.Item>
						})}

						<Pagination.Next disabled={page === pages[pages.length - 1]} onClick={() => onPageChange(page + 1)} />
					</Pagination>
				</Row>
				<Row >
					<Col style={{ textAlign: 'right', fontFamily: 'Sora-Regular' }}>
						Desenvolvido por Wagner Cândido
					</Col>
				</Row>
			</Container>

			<Dialog header={produtoSelecionado.nome} style={{ width: '450px' }} visible={visibleDialogProduto} onHide={() => { setVisibleDialogProduto(false); }} modal className="p-fluid">
				<Container>
					<Row className='linha-secundaria'>
						<Col>Cod: {produtoSelecionado.codigo}</Col>
						<Col>Emb: {produtoSelecionado.embalagem}</Col>
					</Row>
					<Row className='linha-secundaria'>
						<Col>Múltiplo: {produtoSelecionado.multiplo}</Col>
						<Col>IPI: {produtoSelecionado.ipi}</Col>
					</Row>
					<Row>
						<Col className='preco-visualizacao'>R$ {produtoSelecionado.preco}</Col>
					</Row>
					<Row>
						<Col md={5}>
							<span className="p-buttonset">
								<Button label="" icon="pi pi-minus" onClick={() => { somarQtdProdutoSelecionado(false) }} />
								<Button label={String(qtdProduto)} disabled className="" />
								<Button label="" icon="pi pi-plus" onClick={() => { somarQtdProdutoSelecionado(true) }} />
							</span>
						</Col>
						<Col md={7}>
							<Button label='Adicionar' className='p-button-success mr-2' type='button' onClick={() => { adicionarProduto(produtoSelecionado); setVisibleDialogProduto(false); }} />
						</Col>

					</Row>
				</Container>
			</Dialog>

			<Dialog header="Carrinho" style={{ width: '450px' }} visible={visibleDialogCarrinho} onHide={() => { setVisibleDialogCarrinho(false); }} modal className="p-fluid">
				<Container>
					{carrinho.map(produto => {
						return <Row key={produto._id} className='linha-produto-carrinho'>
							<Col xs={8} className='nome-prod-carrinho'>
								{produto.quantidade} x {produto.nome}
							</Col>
							<Col xs={4} className='valor-prod-carrinho'>
								R$ {(produto.quantidade * produto.preco).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
							</Col>
							<Col xs={12}>
								<span className='botao-acao' onClick={() => selecionarProduto(produto)}>Editar</span> <span className='botao-acao' onClick={() => adicionarProduto({ ...produto, quantidade: 0 })}>Remover</span>
							</Col>
						</Row>
					})}
					<Row className='linha-total'>
						<Col xs={8} className='nome-prod-carrinho'>
							Valor do Pedido
						</Col>
						<Col xs={4} className='valor-prod-carrinho'>
							R$ {totalPedido.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
						</Col>
					</Row>
					<Row>
						<Col>
							<Button label='Enviar pedido' className='p-button-success mr-2' type='button' onClick={() => { enviarPedido(); }} />
						</Col>

					</Row>
				</Container>
			</Dialog>

			<Dialog header="Concluído" style={{ width: '450px' }} visible={visibleDialogResposta} onHide={() => { setVisibleDialogResposta(false); }} modal className="p-fluid">
				<Container>
					<Row>
						<Col>
							<h3 style={{ color: '#50a773', textAlign: 'center' }}>
								{respostaPedido?.message}
							</h3>
						</Col>
					</Row>
					<Row style={{ padding: '20px 0' }}>
						<Col xs={8} className='nome-prod-carrinho'>
							Valor do pedido:
						</Col>
						<Col xs={4} className='valor-prod-carrinho'>
							R$ {respostaPedido?.valorSemImposto.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
						</Col>
						<Col xs={8} className='nome-prod-carrinho'>
							Valor Com impostos:
						</Col>
						<Col xs={4} className='valor-prod-carrinho'>
							R$ {respostaPedido?.valorSemImposto.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
						</Col>
					</Row>

					<Row>
						<Col>
							<Button label='Fechar' className='p-button-success mr-2' type='button' onClick={() => { setVisibleDialogResposta(false); }} />
						</Col>

					</Row>
				</Container>
			</Dialog>
		</>
	);
}
