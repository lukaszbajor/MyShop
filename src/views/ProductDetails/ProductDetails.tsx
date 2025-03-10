import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { Details } from "../../components/Details/Details";
import { ExpandableMenu } from "../../components/ExpandableMenu/ExpandableMenu";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Photos } from "../../components/Photos/Photos";
import { fetchProductById } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

export function ProductDetails() {
	const { id } = useParams<{ id: string }>(); // Pobierz id z URL

	// Jeśli id jest undefined, wyświetl komunikat o błędzie
	if (!id) {
		return <div>Brak ID w URL</div>;
	}

	const {
		data: product,
		isLoading,
		isError,
		error,
		// eslint-disable-next-line react-hooks/rules-of-hooks
	} = useQuery({
		queryKey: ["product", { id }],
		queryFn: () => fetchProductById(id),
		enabled: !!id,
	});

	if (isError) return <p>❌ Błąd: {error.message}</p>;

	// const product = {
	// 	id: 13,
	// 	gender: "men",
	// 	category: "odziez",
	// 	subcategory: "koszulki",
	// 	productName: "T-shirt 4",
	// 	brand: "Sun Tzu",
	// 	pricePLN: 129,
	// 	priceUSD: 39,
	// 	photos: [
	// 		"https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_960_720.jpg",
	// 		"https://cdn.pixabay.com/photo/2023/08/10/00/19/japanese-8180481_960_720.jpg",
	// 		"https://cdn.pixabay.com/photo/2021/02/26/15/53/man-6052263_960_720.jpg",
	// 	],
	// 	description:
	// 		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis aperiam, magnam dolorum sit expedita nihil nostrum, voluptates temporibus voluptatum atque ullam molestiae provident dolore eligendi? Esse amet dolore illum.",
	// 	maintenanceInfo:
	// 		"Nemo et nam quasi in suscipit earum odit laborum repellat quo dolore rem, sequi eaque sapiente quibu",
	// };
	return (
		<FlexContainer>
			<ExpandableMenu />
			<div style={{ width: "100%" }}>
				<Breadcrumbs />
				{isLoading && <Loader />}
				{!isLoading && product && (
					<FlexContainer>
						<Photos product={product} />
						<Details product={product} />
					</FlexContainer>
				)}
			</div>
		</FlexContainer>
	);
}
