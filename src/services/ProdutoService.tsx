import { api } from '../Api';

export class ProdutoService {

	findAll(page: number = 0) {
		return api.get(`/produtos?page=${page}`);
	}

}