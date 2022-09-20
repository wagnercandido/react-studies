import { api } from '../Api';
import { Produto } from '../dtos/Produto';

export class PedidoService {

	send(pedido: Produto[]) {
		return api.post(`/pedido`, pedido);
	}

}