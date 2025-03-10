import styles from "./ExpandableMenu.module.scss";
import { CATEGORIES, GENDERS } from "../../constants/categories";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const getGenderNamePL = (genderPath: string): string => {
	const gender = GENDERS.find((gender) => gender.path === genderPath);
	return gender ? gender.categoryNamePL : "Nieznane"; // Jeśli nie znajdziemy, zwracamy "Nieznane"
};

export function ExpandableMenu() {
	const { gender, category } = useParams();

	const genderNamePL = getGenderNamePL(gender || "");

	const activePath = category;
	return (
		<div className={styles.expandableMenu}>
			<p>{genderNamePL}</p>
			<ul>
				{CATEGORIES.map((item) => {
					return (
						<li key={item.path}>
							<NavLink to={`/${gender}/${item.path}`}>
								{item.categoryName}{" "}
								<FontAwesomeIcon
									icon={faChevronDown}
									className={activePath === item.path ? styles.expanded : ""}
								/>
							</NavLink>
							{activePath === item.path && (
								<ul>
									{item.subcategories.map((subcategory) => {
										return (
											<li key={subcategory.path}>
												<NavLink
													to={`/${gender}/${item.path}/${subcategory.path}`}
												>
													{subcategory.categoryName}
												</NavLink>
											</li>
										);
									})}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
