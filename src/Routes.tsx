import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import { AlertComponent } from './components/alert-component/AlertComponent';

import { FirstPage } from './components/first-page/FirstPage';
import { PageTable } from './components/page-table/PageTable';
import { SecondPage } from './components/second-page/SecondPage';

export function AppRoutes() {
	return (
		<Router>
			<AlertComponent />
			<Routes>
				<Route path='' element={<PageTable />} />
				<Route path='/first-page' element={<FirstPage />} />
				<Route path='/second-page' element={<SecondPage />} />
			</Routes>
		</Router>
	)
}