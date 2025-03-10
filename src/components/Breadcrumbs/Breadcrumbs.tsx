// import styles from "./Breadcrumbs.module.scss";
// import { NavLink } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// export function Breadcrumbs() {
// 	const breadcrumbs = [
// 		{
// 			categoryName: "Kobieta",
// 			path: "women",
// 		},
// 		{
// 			categoryName: "Odzież",
// 			path: "clothes",
// 		},
// 		{
// 			categoryName: "Swetry",
// 			path: "sweaters",
// 		},
// 	];
// 	return (
// 		<ul className={styles.breadcrumbs}>
// 			{breadcrumbs.map((breadcrumb) => {
// 				return (
// 					<li key={breadcrumb.path}>
// 						<NavLink to={breadcrumb.path}>
// 							{breadcrumb.categoryName}
// 							<FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
// 						</NavLink>
// 					</li>
// 				);
// 			})}
// 		</ul>
// 	);
// }

import styles from "./Breadcrumbs.module.scss";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { GENDERS, CATEGORIES } from "../../constants/categories"; // Załóżmy, że GENDERS i CATEGORIES są w tym pliku

// Funkcja pomocnicza, która znajduje kategorię na podstawie path
const findCategoryByPath = (path: string) => {
	return CATEGORIES.find((category) => category.path === path);
};

// Funkcja pomocnicza, która znajduje subkategorię na podstawie path
const findSubcategoryByPath = (
	categoryPath: string,
	subcategoryPath: string
) => {
	const category = findCategoryByPath(categoryPath);
	return category?.subcategories.find(
		(subcategory) => subcategory.path === subcategoryPath
	);
};

export function Breadcrumbs() {
	const { gender, category, subcategory } = useParams();

	// Funkcja do znalezienia odpowiedniego gender
	const getGenderName = (genderPath: string) => {
		const genderData = GENDERS.find((g) => g.path === genderPath);
		return genderData ? genderData.categoryNamePL : "Nieznany";
	};

	const genderName = getGenderName(gender || "womens"); // Jeśli brak gender, domyślnie ustawiamy "womens"

	// Breadcrumbs bazujące na ścieżce
	const breadcrumbs = [
		{ categoryName: genderName, path: gender || "" }, // 1. Gender (np. Kobieta)
		category && {
			categoryName: findCategoryByPath(category)?.categoryName || "",
			path: category,
		}, // 2. Category
		subcategory && {
			categoryName:
				findSubcategoryByPath(category || "", subcategory)?.categoryName || "",
			path: subcategory,
		}, // 3. Subcategory
	].filter(Boolean); // Usuwamy puste wartości (np. jeśli brak kategorii lub subkategorii)

	return (
		<ul className={styles.breadcrumbs}>
			{breadcrumbs.map((breadcrumb, index) => {
				// Określamy, czy breadcrumb jest ostatnim elementem
				const isLast = index === breadcrumbs.length - 1;
				return (
					<li key={breadcrumb.path}>
						<NavLink
							to={`/${
								breadcrumb.path && breadcrumb.path !== gender
									? gender + "/"
									: ""
							}${breadcrumb.path}`}
							// Jeśli to ostatni breadcrumb, blokujemy kliknięcie
							aria-disabled={isLast ? "true" : undefined}
							style={isLast ? { pointerEvents: "none" } : {}}
						>
							{breadcrumb.categoryName}
							{index < breadcrumbs.length - 1 && (
								<FontAwesomeIcon
									icon={faChevronRight}
									className={styles.icon}
								/>
							)}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
}
