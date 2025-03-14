import styles from "./Product.module.scss";
import { Link, useParams } from "react-router-dom";
import { ProductTypes } from "../../types/ProductTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { NotificationModal } from "../NotificationModal/NotificationModal";
import { CurrencyContext } from "../../contexts/CurrencyContext";

interface ProductProps {
	product: ProductTypes;
}

export function Product({ product }: ProductProps) {
	const { gender } = useParams();
	const [isFavourite, setIsFavourite] = useState(false); // 🆕 Stan ulubionego produktu
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [currency] = useContext(CurrencyContext) as ["PLN" | "USD" | "EUR"];

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
			setNotificationMessage("Produkt dodany do listy ulubionych.");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
			}, 3000);
		} else {
			setNotificationMessage("Ten produkt jest już na liście ulubionych.");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
			}, 3000);
		}
		setIsFavourite(!isFavourite);
	}

	const checkFavouriteProduct = JSON.parse(
		localStorage.getItem("favourites") || "[]"
	).some((fav: ProductTypes) => fav.id === product.id);

	return (
		<>
			<div style={{ position: "relative", overflow: "hidden" }}>
				<Link
					to={`/${gender}/${product.category_path}/${product.subcategory_path}/product_details/${product.id}`}
					className={styles.product}
				>
					<img src={product.photos[0]} alt="zdjęcie produktu" />
					<h3>{product.product_name}</h3>
					<p>
						{currency === "PLN"
							? `${product.price_pln.toFixed(2)} zł`
							: currency === "USD"
							? `${product.price_usd.toFixed(2)} $`
							: currency === "EUR"
							? `${product.price_eur.toFixed(2)} €`
							: null}
					</p>
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
			{showNotification && <NotificationModal message={notificationMessage} />}
		</>
	);
}
