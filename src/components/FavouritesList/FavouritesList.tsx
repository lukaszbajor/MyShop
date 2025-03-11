import styles from "./FavouritesList.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { CoreContent } from "../CoreContent/CoreContent";
import { FavouriteProduct } from "../FavouriteProduct/FavouriteProduct";
import { useEffect, useState } from "react";
import { NotificationModal } from "../NotificationModal/NotificationModal";

// interface FavouriteListProps {
// 	products: ProductTypes[];
// }

export function FavouriteList() {
	const [favourites, setFavourites] = useState<ProductTypes[]>([]);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");

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
		setNotificationMessage("Produkt usunięto z listy ulubionych.");
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
		}, 3000);
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
			{showNotification && <NotificationModal message={notificationMessage} />}
		</CoreContent>
	);
}
