import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
export function Logo() {
	return (
		<h1 className={styles.logo}>
			<Link to="/">
				<span>C</span>lothing<span>W</span>orld
			</Link>
		</h1>
	);
}
