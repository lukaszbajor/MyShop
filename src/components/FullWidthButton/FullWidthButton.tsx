import { ReactNode } from "react";
import styles from "./FullWidthButton.module.scss";

interface FullWidthButtonProps {
	children: ReactNode;
	onClick: () => void;
}

export function FullWidthButton({ children, onClick }: FullWidthButtonProps) {
	return (
		<button onClick={onClick} className={styles.button}>
			{children}
		</button>
	);
}
