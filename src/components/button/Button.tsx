import React from "react";

type ButtonAppProps = {
	label: string;
	onClick: () => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonAppProps> = ({
	label,
	onClick,
	disabled,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			style={{
				backgroundColor: disabled ? 'gray' : '#8257e6',
				border: '1px solid purple',
				padding: '1rem',
				borderRadius: 5,
				color: 'white',
				cursor: 'pointer'
			}}
		>
			{label}
		</button>
	);
}

export default Button;