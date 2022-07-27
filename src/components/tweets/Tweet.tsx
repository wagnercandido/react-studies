import './Tweet.css';

type TweetProps = {
	text: string;
}

export function Tweet(props: TweetProps) {
	return (
		<div className='classe-teste'
			style={{
				backgroundColor: 'gray',
				marginBottom: '1rem'
			}} >{props.text}</div>
	);
}