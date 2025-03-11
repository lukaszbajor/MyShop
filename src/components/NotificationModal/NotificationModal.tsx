import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./NotificationModal.module.scss";

export function NotificationModal({ message }: { message: string }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) return null;

	return createPortal(
		<div className={`${styles.modal} ${!isVisible ? styles.hidden : ""}`}>
			<h3 className={styles.title}>Powiadomienie</h3>
			<p className={styles.message}>{message}</p>
		</div>,

		document.body
	);
}
