import styles from "./Details.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FullWidthButton } from "../FullWidthButton/FullWidthButton";
import { ProductTypes } from "../../types/ProductTypes";
import { Accordion } from "../Accordion/Accordion";
import { CartCountContext } from "../../contexts/CartCountContext";
import { useContext, useState } from "react";
import { NotificationModal } from "../NotificationModal/NotificationModal";
// import { supabase } from "../../supabaseClient";
// import { useQuery } from "@tanstack/react-query";

interface ProductProps {
	product: ProductTypes;
}

export function Details({ product }: ProductProps) {
	const { updateCartCount } = useContext(CartCountContext);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");

	function handleAddToCart() {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		if (!cart.find((cartItem: ProductTypes) => cartItem.id === product.id)) {
			cart.push(product);
			localStorage.setItem("cart", JSON.stringify(cart));
			setNotificationMessage("Produkt dodany do koszyka.");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
			}, 3000);
			// Pokaż modal
			updateCartCount();
		} else {
			setNotificationMessage("Ten produkt jest już w koszyku.");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
			}, 3000);
		}
	}

	const accordionContent = [
		{ title: "Opis produktu", content: product.description },
		{ title: "Wskazówki pielęgnacyjne", content: product.maintenance_info },
	];
	return (
		<div className={styles.details}>
			<h2>{product.brand}</h2>
			<p className={styles.productName}>{product.product_name}</p>
			<p className={styles.price}>{product.price_pln}zł</p>

			<FullWidthButton onClick={handleAddToCart}>
				Dodaj do koszyka
			</FullWidthButton>

			<ul className={styles.extraInfo}>
				<li>
					<FontAwesomeIcon icon={faCarSide} />
					Dostawa do 24h
				</li>
				<li>
					<FontAwesomeIcon icon={faRotateLeft} />
					Zwrot do 30 dni!
				</li>
			</ul>
			<Accordion items={accordionContent} />
			{showNotification && <NotificationModal message={notificationMessage} />}
		</div>
	);
}
