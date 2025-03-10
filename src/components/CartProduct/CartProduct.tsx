import styles from "./CartProduct.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface CartProductProps {
	product: ProductTypes;
	removeFromCart: (productId: number) => void;
}

export function CartProduct({ product, removeFromCart }: CartProductProps) {
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
					<p>{product.price_pln.toFixed(2)}zł</p>
				</div>
				<p className={styles.priceRow}>
					<span>Cena: </span>
					{product.price_pln.toFixed(2)}zł
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
