import Button from "../button/Button";

export function SecondPage() {

	function redirect(rota?: string) {
		if (rota && typeof rota === 'string') {
			location.href = rota;
			return;
		}
		history.back();
	}

	return (
		<>
			<h1>Second Page Test</h1>
			<Button
				label='Página de tweets'
				onClick={() => redirect('/first-page')}
			/>

			<br /><br /><br />

			<Button
				label='Voltar'
				onClick={redirect}
			/>
		</>
	)
}