import styles from "./Pagination.module.scss";
interface PaginationProps {
	numberOfPages: number | null;
	currentPage: number;
	paginate: (pageNumber: number) => void;
}

export function Pagination({
	numberOfPages,
	currentPage,
	paginate,
}: PaginationProps) {
	const validNumberOfPages =
		typeof numberOfPages === "number" && numberOfPages > 0 ? numberOfPages : 1;

	// Generujemy strony na podstawie validNumberOfPages
	const pages = Array.from(
		{ length: validNumberOfPages },
		(_, index) => index + 1
	);

	return (
		<ul className={styles.pagination}>
			{pages.map((page) => {
				// const pageNumber = index + 1;
				return (
					<li key={page}>
						{/* <NavLink
							to={`/${index + 1}`}
							className={currentPage === pageNumber ? styles.active : ""}
							onClick={() => paginate(pageNumber)}
						>
							{index + 1}
						</NavLink> */}
						<button
							className={currentPage === page ? styles.active : ""}
							onClick={() => paginate(page)}
							disabled={currentPage === page}
						>
							{page}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
