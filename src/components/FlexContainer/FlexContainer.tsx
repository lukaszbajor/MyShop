import { ReactNode } from "react";
import styles from "./FlexContainer.module.scss";

interface FlexContainterProps {
	children: ReactNode;
}

export function FlexContainer({ children }: FlexContainterProps) {
	return <div className={styles.flexContainer}>{children}</div>;
}
