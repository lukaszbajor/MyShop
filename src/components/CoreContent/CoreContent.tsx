import styles from "./CoreContent.module.scss";
import { ReactNode } from "react";

interface CoreContentProps {
	children?: ReactNode;
}

export function CoreContent({ children }: CoreContentProps) {
	return <div className={styles.wrapper}>{children}</div>;
}
