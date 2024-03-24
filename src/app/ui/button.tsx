import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
	return (
		<button
			{...rest}
			className={clsx(
				'bg-gray-800 rounded-lg px-4 w-fit h-10 text-white font-medium text-base flex items-center justify-center self-end hover:bg-gray-700',
				className,
			)}
		>
			{children}
		</button>
	);
}
