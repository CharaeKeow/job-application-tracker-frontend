import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
	return (
		<button
			{...rest}
			type="button"
			className={clsx(
				'flex h-10 w-fit items-center justify-center self-end rounded-lg bg-gray-800 px-4 text-base font-medium text-white hover:bg-gray-700',
				className,
			)}
		>
			{children}
		</button>
	);
}
