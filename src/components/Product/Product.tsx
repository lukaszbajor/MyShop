import styles from "./Product.module.scss";
import { Link, useParams } from "react-router-dom";
import { ProductTypes } from "../../types/ProductTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface ProductProps {
	product: ProductTypes;
}

export function Product({ product }: ProductProps) {
	const { gender } = useParams();
	const [isFavourite, setIsFavourite] = useState(false); // 🆕 Stan ulubionego produktu

	useEffect(() => {
		const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
		setIsFavourite(
			favourites.some((fav: ProductTypes) => fav.id === product.id)
		);
	}, []); // Odpala się tylko raz po załadowaniu

	function handleAddToFavourites() {
		const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
		if (!favourites.find((fav: ProductTypes) => fav.id === product.id)) {
			// Jeśli nie ma, dodaj go do listy
			favourites.push(product);
			// Zapisz zaktualizowaną listę w localStorage
			localStorage.setItem("favourites", JSON.stringify(favourites));
			alert("Produkt dodany do ulubionych!");
		} else {
			alert("Ten produkt jest już na liście ulubionych!");
		}
		setIsFavourite(!isFavourite);
	}

	const checkFavouriteProduct = JSON.parse(
		localStorage.getItem("favourites") || "[]"
	).some((fav: ProductTypes) => fav.id === product.id);

	return (
		<div style={{ position: "relative", overflow: "hidden" }}>
			<Link
				to={`/${gender}/${product.category_path}/${product.subcategory_path}/product_details/${product.id}`}
				className={styles.product}
			>
				<img src={product.photos[0]} alt="zdjęcie produktu" />
				<h3>{product.product_name}</h3>
				<p>{product.price_pln.toFixed(2)}zł</p>
			</Link>
			{product.is_bestseller && (
				<div className={styles.bestseller}>bestseller</div>
			)}
			<FontAwesomeIcon
				icon={faHeart}
				className={`${styles.heart} ${
					checkFavouriteProduct ? styles.isFavourite : ""
				}`}
				onClick={handleAddToFavourites}
			/>
		</div>
	);
}
