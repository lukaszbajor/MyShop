import styles from "./FavouriteProduct.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CartCountContext } from "../../contexts/CartCountContext";
import { NotificationModal } from "../NotificationModal/NotificationModal";

// const [showNotification, setShowNotification] = useState(false);
// 	const [notificationMessage, setNotificationMessage] = useState("");

// 	setNotificationMessage("Usunięto produkt z koszyka!");
// 	setShowNotification(true);
// 	setTimeout(() => {
// 		setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
// 	}, 3000);
// 	{
// 		showNotification && <NotificationModal message={notificationMessage} />;
// 	}

interface FavouriteProductProps {
	product: ProductTypes;
	onRemove: (productId: number) => void;
}

export function FavouriteProduct({ product, onRemove }: FavouriteProductProps) {
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const { updateCartCount } = useContext(CartCountContext);

	function handleAddToCart(product: ProductTypes) {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		if (!cart.find((cartItem: ProductTypes) => cartItem.id === product.id)) {
			cart.push(product);
			localStorage.setItem("cart", JSON.stringify(cart));
			setNotificationMessage("Produkt dodany do koszyka.");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
			}, 3000);
			updateCartCount();
		} else {
			setNotificationMessage("Ten produkt jest już w koszyku.");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
			}, 3000);
		}
	}

	const handleRemoveProductFromFavourites = (productId: number) => {
		// Pobierz listę ulubionych produktów
		let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

		// Usuń produkt z listy
		favourites = favourites.filter((fav: ProductTypes) => fav.id !== productId);

		// Zapisz zaktualizowaną listę w localStorage
		localStorage.setItem("favourites", JSON.stringify(favourites));

		setNotificationMessage("Produkt usunięty z listy ulubionych.");
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
		}, 3000);

		onRemove(productId);
	};
	return (
		<div className={styles.favouriteProduct}>
			<img src={product.photos[0]} alt="zdjęcie ulubionego produktu" />
			<div className={styles.favouriteProductInfo}>
				<div className={styles.topRow}>
					<h3>
						{product.brand}
						<p className={styles.productName}>{product.product_name}</p>
					</h3>
					<p>{product.price_pln.toFixed(2)}zł</p>
				</div>
				<p className={styles.priceRow}>
					<span>Cena: </span>
					{product.price_pln.toFixed(2)}zł
				</p>
				<div className={styles.buttonRow}>
					<button
						onClick={() => {
							handleRemoveProductFromFavourites(product.id);
						}}
					>
						<FontAwesomeIcon icon={faClose} className={styles.icon} /> Usuń
					</button>
					<button
						onClick={() => {
							handleAddToCart(product);
						}}
					>
						<FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
						Dodaj do koszyka
					</button>
				</div>
			</div>

			{showNotification && <NotificationModal message={notificationMessage} />}
		</div>
	);
}
