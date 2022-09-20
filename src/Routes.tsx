import {
	BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import { AlertComponent } from './components/alert-component/AlertComponent';

import { CadastrarProduto } from './components/form-produto/CadastrarProduto';
import { Produtos } from './components/produtos/Produtos';

export function AppRoutes() {
	return (
		<Router>
			<AlertComponent />
			<Routes>
				<Route path='' element={<Produtos />} />
				<Route path='/cadastrar-produto' element={<CadastrarProduto />} />
			</Routes>
		</Router>
	)
}