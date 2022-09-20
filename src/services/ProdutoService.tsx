import { api } from '../Api';
import { Produto } from '../dtos/Produto';

export class ProdutoService {

	findAll(page: number) {
		return api.get(`/produtos?page=${page}`);
	}

	save(produto: Produto) {
		return api.post(`/produtos`, produto);
	}

}