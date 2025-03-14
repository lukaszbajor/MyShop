import { Bestsellers } from "../../components/Products/Products";
import { Hero } from "../../components/Hero/Hero";
// import { ProductTypes } from "../../types/ProductTypes";
import { useParams } from "react-router-dom";
// import { useProductsQuery } from "../../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { fetchMainProducts } from "../../api/mainproducts";
import Loader from "../../components/Loader/Loader";

export function MainPage() {
	const { gender, category, subcategory } = useParams();
	// const products: ProductTypes[] = [
	// 	{
	// 		id: 1,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		product_name: "T-Shirt",
	// 		brand: "Top Brand",
	// 		price_pln: 49,
	// 		price_usd: 10,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2023/08/10/00/19/japanese-8180481_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2021/02/26/15/53/man-6052263_960_720.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenance_info:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 2,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		product_name: "T-Shirt",
	// 		brand: "Top Brand",
	// 		price_pln: 49,
	// 		price_usd: 10,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2021/02/06/08/50/man-5987349_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2019/03/15/10/21/fashion-4056729_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2015/01/13/13/20/guy-598180_960_720.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenance_info:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 3,
	// 		gender: "men",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		product_name: "T-shirt 2",
	// 		brand: "Sun Tzu",
	// 		price_pln: 199,
	// 		price_usd: 49,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2020/06/04/06/23/mockup-5257444_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2018/02/15/17/00/causal-man-3155771_960_720.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenance_info:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// 	{
	// 		id: 4,
	// 		gender: "women",
	// 		category: "odziez",
	// 		subcategory: "koszulki",
	// 		product_name: "T-shirt 3",
	// 		brand: "Sun Tzu",
	// 		price_pln: 199,
	// 		price_usd: 49,
	// 		photos: [
	// 			"https://cdn.pixabay.com/photo/2020/01/22/15/12/fashion-4785546_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2020/01/22/15/12/fashion-4785546_960_720.jpg",
	// 			"https://cdn.pixabay.com/photo/2020/01/22/15/12/fashion-4785546_960_720.jpg",
	// 		],
	// 		description:
	// 			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 		maintenance_info:
	// 			"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// 	},
	// ];

	// const { gender, category, subcategory } = useParams();
	const {
		data: products,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["products", { category, subcategory, gender }], // klucz zależny od parametrów
		queryFn: fetchMainProducts,
		enabled: !!category || !!subcategory || !!gender, // odpala tylko gdy mamy jakikolwiek filtr
	});

	// if (isLoading) return <p>Ładowanie...</p>;
	if (isError) return <p>❌ Błąd: {error.message}</p>;

	const bestsellerProducts = products
		?.filter((product) => product.is_bestseller)
		.slice(0, 4);

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && products && products.length > 0 && (
				<>
					<Hero />

					<Bestsellers
						headerText="Sprawdź nasze bestsellery!"
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						products={bestsellerProducts}
					/>
				</>
			)}
		</>
	);
}
