import { ReactNode } from "react";
import styles from "./MainContent.module.scss";

interface MainContentProps {
	children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
	return <div className={styles.mainContent}>{children}</div>;
}
