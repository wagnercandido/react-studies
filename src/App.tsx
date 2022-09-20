import { AppRoutes } from "./Routes"
import './App.css'
import { Container, Navbar } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/img/logo.png';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
import './assets/Cyrene-Regular.otf';                           //icons
import './assets/Sora-Regular.ttf';                           //icons
 

function App() {

	return (
		<>
			<div className="box">
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="#home">
							<img
								alt=""
								src={logo}
								height="30"
								className="d-inline-block align-top"
							/>{' '}
							<strong>Treinamento Guarani</strong>
						</Navbar.Brand>
					</Container>
				</Navbar>
				<div className="box-content">
					{/* <div className="sidebar">
						<ul>
							<li>
								<a className="menu-link" href="/">Users</a></li>
							<li>
								<a className="menu-link" href="/first-page">Tweets</a></li>
							<li>
								<a className="menu-link" href="/second-page">Page test</a></li>
						</ul>
					</div> */}
					<div className="content">
						<AppRoutes />
					</div>
				</div>
			</div>
		</>
	)
}

export default App
