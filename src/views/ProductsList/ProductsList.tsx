import { Bestsellers } from "../../components/Products/Products";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { ExpandableMenu } from "../../components/ExpandableMenu/ExpandableMenu";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Pagination } from "../../components/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/products";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader/Loader";
import { CATEGORIES } from "../../constants/categories";
import { useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function getCategoryName(categoryPath: string) {
	const category = CATEGORIES.find((c) => c.path === categoryPath);
	return category ? category.categoryName : null;
}

// eslint-disable-next-line react-refresh/only-export-components
export function getSubcategoryName(
	categoryPath: string,
	subcategoryPath: string
) {
	const category = CATEGORIES.find((c) => c.path === categoryPath);
	if (category) {
		const subcategory = category.subcategories.find(
			(sc) => sc.path === subcategoryPath
		);
		return subcategory ? subcategory.categoryName : null;
	}
	return null;
}

export function ProductsList() {
	const { gender, category, subcategory } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 8;

	const categoryName = category ? getCategoryName(category) : null;
	const subcategoryName = subcategory
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
		  //@ts-ignore
		  getSubcategoryName(category, subcategory)
		: null;

	const {
		data: products,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["products", { category, subcategory, gender }],
		queryFn: fetchProducts,
		enabled: !!category || !!subcategory || !!gender,
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [products]);

	if (isError) return <p>❌ Błąd: {error.message}</p>;

	if (isLoading) return <Loader />;

	const totalProducts = products?.length || 0;

	const totalPages = Math.ceil(totalProducts / productsPerPage);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products?.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<FlexContainer>
			<ExpandableMenu />
			<div style={{ width: "100%" }}>
				<Breadcrumbs />
				{isLoading && <Loader />}
				{!isLoading && products && products.length > 0 ? (
					<>
						<Bestsellers
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							headerText={subcategoryName ? subcategoryName : categoryName}
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							products={currentProducts}
						/>
						<Pagination
							numberOfPages={totalPages || 1}
							currentPage={currentPage}
							paginate={paginate}
						/>
					</>
				) : (
					<div
						style={{
							height: "100%",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								paddingBottom: "3rem",
							}}
						>
							Brak produktów w sklepie. Wróć niebawem, uzupełniamy nasz
							asortyment systematycznie!
						</p>
						<FontAwesomeIcon
							icon={faHourglass}
							style={{
								fontSize: "84px",
								color: "#0979c8",
								paddingBottom: "2rem",
							}}
						/>
					</div>
				)}
			</div>
		</FlexContainer>
	);
}
