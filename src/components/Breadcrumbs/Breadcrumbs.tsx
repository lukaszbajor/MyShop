/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					<li key={breadcrumb.path}>
						<NavLink
							to={`/${
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								breadcrumb.path && breadcrumb.path !== gender
									? gender + "/"
									: ""
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
							}${breadcrumb.path}`}
							// Jeśli to ostatni breadcrumb, blokujemy kliknięcie
							aria-disabled={isLast ? "true" : undefined}
							style={isLast ? { pointerEvents: "none" } : {}}
						>
							{
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								breadcrumb.categoryName
							}
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
