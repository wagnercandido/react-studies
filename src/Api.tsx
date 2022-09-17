
import axios from "axios";

const api = axios.create({
	baseURL: 'https://guarani-back.herokuapp.com'
});

export { api };