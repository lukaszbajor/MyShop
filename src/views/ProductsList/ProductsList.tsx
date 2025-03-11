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

// eslint-disable-next-line react-refresh/only-export-components
export function getCategoryName(categoryPath: string) {
	const category = CATEGORIES.find((c) => c.path === categoryPath);
	return category ? category.categoryName : null; // Zwraca nazwę kategorii
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
		return subcategory ? subcategory.categoryName : null; // Zwraca nazwę subkategorii
	}
	return null;
}

export function ProductsList() {
	const { gender, category, subcategory } = useParams();

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
		queryKey: ["products", { category, subcategory, gender }], // klucz zależny od parametrów
		queryFn: fetchProducts,
		enabled: !!category || !!subcategory || !!gender, // odpala tylko gdy mamy jakikolwiek filtr
	});

	// if (isLoading) return <p>Ładowanie...</p>;
	if (isError) return <p>❌ Błąd: {error.message}</p>;

	// Jeśli dane są ładowane, wyświetl loader
	if (isLoading) return <Loader />;

	// Jeśli produkty zostały załadowane, ale lista jest pusta, wyświetl komunikat o braku produktów
	// if (!isLoading && (!products || products.length === 0)) {
	// 	return <p>Brak produktów w sklepie.</p>;
	// }
	// const products = [
	// 	{
	// 		id: 13,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-shirt 4",
	// 		brand: "Sun Tzu",
	// 		pricePLN: 129,
	// 		priceUSD: 39,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-3.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 14,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-Shirt",
	// 		brand: "Top Brand",
	// 		pricePLN: 49,
	// 		priceUSD: 10,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-3.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 15,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-shirt 2",
	// 		brand: "Sun Tzu",
	// 		pricePLN: 199,
	// 		priceUSD: 49,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-3.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 16,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-shirt 3",
	// 		brand: "Sun Tzu",
	// 		pricePLN: 199,
	// 		priceUSD: 49,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-1.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 17,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-shirt 4",
	// 		brand: "Sun Tzu",
	// 		pricePLN: 129,
	// 		priceUSD: 39,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-3.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 18,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-Shirt",
	// 		brand: "Top Brand",
	// 		pricePLN: 49,
	// 		priceUSD: 10,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-3.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 19,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-shirt 2",
	// 		brand: "Sun Tzu",
	// 		pricePLN: 199,
	// 		priceUSD: 49,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-3.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 20,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		productName: "T-shirt 3",
	// 		brand: "Sun Tzu",
	// 		pricePLN: 199,
	// 		priceUSD: 49,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-4.jpg",
	// 			"http://localhost:3000/product-photos/man-t-shirt-1.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenanceInfo:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// ];
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
							products={products}
						/>
						<Pagination numberOfPages={5} />
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
