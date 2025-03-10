import styles from "./CategoryMenu.module.scss";
import { CATEGORIES } from "../../constants/categories";
import { NavLink, useParams } from "react-router-dom";

export function CategoryMenu() {
	const { gender } = useParams();
	return (
		<div className={styles.categoryMenu}>
			<ul>
				{CATEGORIES.map((category) => {
					const categoryPath = `/${gender || "womens"}/${category.path}`;
					return (
						<li key={category.path}>
							<NavLink to={categoryPath}>{category.categoryName}</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
