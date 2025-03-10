import styles from "./Pagination.module.scss";
import { NavLink } from "react-router-dom";
interface PaginationProps {
	numberOfPages: number | null;
}

export function Pagination({ numberOfPages }: PaginationProps) {
	const pages = Array(numberOfPages).fill(null);
	return (
		<ul className={styles.pagination}>
			{pages.map((page, index) => {
				return (
					<li key={index}>
						<NavLink to={`/${index + 1}`}>{index + 1}</NavLink>
					</li>
				);
			})}
		</ul>
	);
}
