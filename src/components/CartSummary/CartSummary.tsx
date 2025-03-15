import styles from "./CartSummary.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { FullWidthButton } from "../FullWidthButton/FullWidthButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";

interface CartSummaryProps {
	products: ProductTypes[];
}

// { products }: CartSummaryProps

export function CartSummary({ products }: CartSummaryProps) {
	const [currency] = useContext(CurrencyContext) as ["PLN" | "USD" | "EUR"];
	// Funkcja do wczytania produktów z localStorage

	// Wczytanie koszyka po pierwszym renderze
	console.log(typeof products.length);
	const deliveryCost = {
		PLN: 29,
		USD: 14,
		EUR: 12,
	};
	const minSumForFreeDelivery = {
		PLN: 499.99,
		USD: 125.99,
		EUR: 122.99,
	};

	let sum = 0;
	products.forEach((product) => {
		if (currency === "PLN") {
			sum += product.price_pln;
		} else if (currency === "USD") {
			sum += product.price_usd;
		} else {
			sum += product.price_eur;
		}
	});

	const totalCost =
		sum > minSumForFreeDelivery[currency] ? sum : sum + deliveryCost[currency];
	return (
		<div className={styles.cartSummary}>
			<h2>Podsumowanie</h2>
			<div className={styles.cartRow}>
				<p>Wartość produktów:</p>
				<p>
					{sum.toFixed(2)}{" "}
					{currency === "PLN" ? "zł" : currency === "USD" ? "$" : "€"}
				</p>
			</div>
			<div className={styles.cartRow}>
				<p>Koszt dostawy: </p>
				<p>
					{sum > minSumForFreeDelivery[currency]
						? 0
						: deliveryCost[currency].toFixed(2)}{" "}
					{currency === "PLN" ? "zł" : currency === "USD" ? "$" : "€"}
				</p>
			</div>
			<div className={`${styles.cartRow} ${styles.summaryRow}`}>
				<p>Do zapłaty:</p>
				<p>
					{totalCost.toFixed(2) + " "}
					{currency === "PLN" ? "zł" : currency === "USD" ? "$" : "€"}
				</p>
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
					sum > minSumForFreeDelivery[currency] ? styles.freeDelivery : ""
				}`}
			>
				<FontAwesomeIcon icon={faCarSide} />
				<p>
					Darmowa dostawa od {minSumForFreeDelivery[currency]}{" "}
					{currency === "PLN" ? "zł" : currency === "USD" ? "$" : "€"}
				</p>
			</div>
		</div>
	);
}
