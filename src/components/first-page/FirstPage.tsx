import { useState } from 'react';
import Button from '../button/Button';
import { Tweet } from '../tweets/Tweet';

export function FirstPage() {
	const [tweets, setTweets] = useState<string[]>([
		'Tweet 1',
		'Tweet 2',
		'Tweet 3',
		'Tweet 4',
	]);

	function criarTweet() {
		setTweets([...tweets, `Tweet ${tweets.length + 1}`]);
	}

	function redirect(rota?: string) {
		if (rota && typeof rota === 'string') {
			location.href = rota;
			return;
		}
		history.back();
	}

	return (
		<>
			<h1>Tweets</h1>

			{tweets.map(tweet => {
				return <Tweet text={tweet} key={tweet} />
			})}

			<Button
				label='Adicionar Tweet'
				onClick={criarTweet}
			/>

			<br /><br /><br />

			<Button
				label='Segunda página'
				onClick={() => redirect('second-page')}
			/>
			<br /><br /><br />

			<Button
				label='Voltar'
				onClick={redirect}
			/>
		</>
	);
}