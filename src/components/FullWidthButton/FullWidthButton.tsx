import { ReactNode } from "react";
import styles from "./FullWidthButton.module.scss";

interface FullWidthButtonProps {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}

export function FullWidthButton({
	children,
	onClick,
	disabled,
}: FullWidthButtonProps) {
	return (
		<button onClick={onClick} className={styles.button} disabled={disabled}>
			{children}
		</button>
	);
}
