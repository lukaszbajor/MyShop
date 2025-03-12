import styles from "./CartSummary.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { FullWidthButton } from "../FullWidthButton/FullWidthButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface CartSummaryProps {
	products: ProductTypes[];
}

// { products }: CartSummaryProps

export function CartSummary({ products }: CartSummaryProps) {
	// Funkcja do wczytania produktów z localStorage

	// Wczytanie koszyka po pierwszym renderze
	console.log(typeof products.length);
	const deliveryCost = 49;
	const minSumForFreeDelivery = 499.99;

	let sum = 0;
	products.forEach((product) => {
		sum += product.price_pln;
	});

	const totalCost = sum > minSumForFreeDelivery ? sum : sum + deliveryCost;
	return (
		<div className={styles.cartSummary}>
			<h2>Podsumowanie</h2>
			<div className={styles.cartRow}>
				<p>Wartość produktów:</p>
				<p>{sum.toFixed(2)}zł</p>
			</div>
			<div className={styles.cartRow}>
				<p>Koszt dostawy:</p>
				<p>{sum > minSumForFreeDelivery ? 0 : deliveryCost}zł</p>
			</div>
			<div className={`${styles.cartRow} ${styles.summaryRow}`}>
				<p>Do zapłaty:</p>
				<p>{totalCost.toFixed(2)}zł</p>
			</div>

			<FullWidthButton>
				<Link
					to={products.length === 0 ? "/cart" : "/order"}
					className={products.length === 0 ? styles.disabled : ""}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					disabled={products.length === 0 && "disabled"}
				>
					Do kasy
				</Link>
			</FullWidthButton>
			<div
				className={`${styles.deliveryInfo} ${
					sum > minSumForFreeDelivery ? styles.freeDelivery : ""
				}`}
			>
				<FontAwesomeIcon icon={faCarSide} />
				<p>Darmowa dostawa od {minSumForFreeDelivery} zł</p>
			</div>
		</div>
	);
}
