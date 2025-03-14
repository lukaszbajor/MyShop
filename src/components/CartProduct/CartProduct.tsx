import styles from "./CartProduct.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";

interface CartProductProps {
	product: ProductTypes;
	removeFromCart: (productId: number) => void;
}

export function CartProduct({ product, removeFromCart }: CartProductProps) {
	const [currency] = useContext(CurrencyContext) as ["PLN" | "USD" | "EUR"];
	// Funkcja do usuwania produktu
	function handleRemoveProduct() {
		removeFromCart(product.id);
	}

	return (
		<div className={styles.cartProduct}>
			<img src={product.photos[0]} alt="zdjęcie produktu w koszyku" />
			<div className={styles.cartProductInfo}>
				<div className={styles.topRow}>
					<h3>
						{product.brand}
						<p className={styles.productName}>{product.product_name}</p>
					</h3>
					<p>
						{currency === "PLN"
							? `${product.price_pln.toFixed(2)} zł`
							: currency === "USD"
							? `${product.price_usd.toFixed(2)} $`
							: currency === "EUR"
							? `${product.price_eur.toFixed(2)} €`
							: null}
					</p>
				</div>
				<p className={styles.priceRow}>
					<span>Cena: </span>
					{currency === "PLN"
						? `${product.price_pln.toFixed(2)} zł`
						: currency === "USD"
						? `${product.price_usd.toFixed(2)} $`
						: currency === "EUR"
						? `${product.price_eur.toFixed(2)} €`
						: null}
				</p>
				<div className={styles.buttonRow}>
					<button onClick={handleRemoveProduct}>
						<FontAwesomeIcon icon={faClose} className={styles.icon} /> Usuń
					</button>
				</div>
			</div>
		</div>
	);
}
