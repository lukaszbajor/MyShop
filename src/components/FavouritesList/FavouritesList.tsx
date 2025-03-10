import styles from "./FavouritesList.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { CoreContent } from "../CoreContent/CoreContent";
import { FavouriteProduct } from "../FavouriteProduct/FavouriteProduct";
import { useEffect, useState } from "react";

// interface FavouriteListProps {
// 	products: ProductTypes[];
// }

export function FavouriteList() {
	const [favourites, setFavourites] = useState<ProductTypes[]>([]);

	// Pobierz ulubione produkty z localStorage przy pierwszym załadowaniu
	useEffect(() => {
		const storedFavourites = JSON.parse(
			localStorage.getItem("favourites") || "[]"
		);
		setFavourites(storedFavourites);
	}, []);

	// 🆕 Funkcja do usuwania produktu i aktualizacji stanu
	const handleRemove = (productId: number) => {
		const updatedFavourites = favourites.filter((fav) => fav.id !== productId);
		setFavourites(updatedFavourites);
		localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
	};
	return (
		<CoreContent>
			<div className={styles.favouritesList}>
				<h2>Ulubione</h2>
				{favourites.length === 0 ? (
					<p className={styles.emptyList}>
						Lista Twoich produktów ulubionych jest pusta.{" "}
					</p>
				) : (
					<div>
						{favourites.map((product) => {
							return (
								<FavouriteProduct
									key={product.id}
									product={product}
									onRemove={handleRemove}
								/>
							);
						})}
					</div>
				)}
			</div>
		</CoreContent>
	);
}
