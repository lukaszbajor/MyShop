import styles from "./FavouriteProduct.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartCountContext } from "../../contexts/CartCountContext";

interface FavouriteProductProps {
	product: ProductTypes;
	onRemove: (productId: number) => void;
}

export function FavouriteProduct({ product, onRemove }: FavouriteProductProps) {
	const { updateCartCount } = useContext(CartCountContext);

	function handleAddToCart(product: ProductTypes) {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		if (!cart.find((cartItem: ProductTypes) => cartItem.id === product.id)) {
			cart.push(product);
			localStorage.setItem("cart", JSON.stringify(cart));
			alert("Produkt dodany do koszyka!");
			updateCartCount();
		} else {
			alert("Ten produkt jest już w koszyku!");
		}
	}

	const handleRemoveProductFromFavourites = (productId: number) => {
		// Pobierz listę ulubionych produktów
		let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

		// Usuń produkt z listy
		favourites = favourites.filter((fav: ProductTypes) => fav.id !== productId);

		// Zapisz zaktualizowaną listę w localStorage
		localStorage.setItem("favourites", JSON.stringify(favourites));

		alert("Produkt usunięty z ulubionych!");

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
		</div>
	);
}
