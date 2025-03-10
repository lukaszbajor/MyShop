import styles from "./MainMenu.module.scss";
import { GENDERS } from "../../constants/categories";
import { NavLink } from "react-router-dom";

export function MainMenu() {
	return (
		<ul className={styles.mainMenu}>
			{GENDERS.map((link) => {
				return (
					<li key={link.path}>
						<NavLink to={link.path.toLowerCase()}>{link.categoryName}</NavLink>
					</li>
				);
			})}
		</ul>
	);
}
