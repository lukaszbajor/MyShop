import styles from "./OrderDetails.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { CartCountContext } from "../../contexts/CartCountContext";
import { NotificationModal } from "../NotificationModal/NotificationModal";

const orderSchema = yup.object().shape({
	nick: yup.string().required("Nick jest wymagany"),
	name: yup.string().required("Imię i nazwisko jest wymagane"),
	email: yup
		.string()
		.email("Niepoprawny e-mail")
		.required("E-mail jest wymagany"),
	address: yup.string().required("Adres jest wymagany"),
	city: yup.string().required("Miasto jest wymagane"),
	postal_code: yup.string().required("Kod pocztowy jest wymagany"),
	country: yup.string().required("Kraj jest wymagany"),
	payment_method: yup.string().required("Wybierz metodę płatności"),
});

export function OrderDetails({ onOrderSubmit }) {
	const [loading, setLoading] = useState(false);
	const [cartProducts, setCartProducts] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");

	const { updateCartCount } = useContext(CartCountContext);

	const delivery = 499;
	const deliveryCost = 49;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(orderSchema),
	});

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCartProducts(storedCart);

		const calculatedTotal = storedCart.reduce(
			(acc, product) => acc + product.price_pln,
			0
		);
		setTotalPrice(calculatedTotal);
	}, []);

	const handleResetCart = () => {
		localStorage.setItem("cart", JSON.stringify([])); // Resetujemy koszyk
		updateCartCount(); // Aktualizujemy liczbę produktów w koszyku
	};

	const handleOrderSuccess = () => {
		setNotificationMessage("Zamówienie zostało złożone!");
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
		}, 3000);
		handleResetCart(); // Resetujemy koszyk po udanym zamówieniu
	};

	const handleOrderError = (message: string) => {
		setNotificationMessage(message);
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false); // Ukryj powiadomienie po 3 sekundach
		}, 3000);
	};

	async function onSubmit(data) {
		setLoading(true);

		// Przygotowanie danych do wysłania
		const productsList = cartProducts.map((product) => ({
			name: product.product_name,
			price: product.price_pln,
		}));

		// Całkowita cena, jeśli jest mniejsza niż 499 PLN to dodajemy koszt wysyłki
		const total =
			totalPrice < delivery ? totalPrice + deliveryCost : totalPrice;

		const { error } = await supabase.from("orders").insert([
			{
				nick: data.nick,
				total_price: total,
				products: productsList, // Lista produktów w formacie JSON
				city: data.city,
			},
		]);

		if (error) {
			handleOrderError("Wystąpił błąd podczas składania zamówienia.");
			console.error(error);
		} else {
			setNotificationMessage("Zamówienie zostało złożone!");
			setShowNotification(true);

			setTimeout(() => {
				handleOrderSuccess();
				onOrderSubmit();
			}, 2000);

			// Aktualizacja stanu po wysłaniu
		}

		setLoading(false);
	}

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.orderSummary}>
					<h2>Zamówienie</h2>
					<h3>Zamówione produkty:</h3>
					<ul>
						{cartProducts.length === 0 ? (
							<p>Brak produktów w koszyku.</p>
						) : (
							cartProducts.map((product, index) => (
								<li key={product.id}>
									<span>
										{index + 1}. {product.product_name} -{" "}
										{product.price_pln.toFixed(2)} zł
									</span>
								</li>
							))
						)}
					</ul>
					{totalPrice < delivery ? (
						<p style={{ color: "red", marginTop: "10px" }}>
							<b>Koszt wysyłki: 49 PLN</b>
						</p>
					) : (
						<p style={{ color: "green", marginTop: "10px" }}>
							<b>Darmowa wysyłka!</b>
						</p>
					)}
					<div className={styles.totalPrice}>
						{totalPrice > delivery ? (
							<h4>Łączna cena: {totalPrice.toFixed(2)} PLN</h4>
						) : (
							<h4>Łączna cena: {(totalPrice + deliveryCost).toFixed(2)} PLN</h4>
						)}
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
					<h3>Formularz zamówienia</h3>
					<div className={styles.inputBox}>
						<div className={styles.inputColumn}>
							<div className={styles.inputItem}>
								<label>Nick użytkownika</label>
								<input {...register("nick")} />
								<p className={styles.error}>{errors.nick?.message}</p>
							</div>
							<div className={styles.inputItem}>
								<label>Imię i nazwisko</label>
								<input {...register("name")} />
								<p className={styles.error}>{errors.name?.message}</p>
							</div>
							<div className={styles.inputItem}>
								<label>Email</label>
								<input {...register("email")} />
								<p className={styles.error}>{errors.email?.message}</p>
							</div>
						</div>
						<div className={styles.inputColumn}>
							<div className={styles.inputItem}>
								<label>Adres</label>
								<input {...register("address")} />
								<p className={styles.error}>{errors.address?.message}</p>
							</div>
							<div className={styles.inputItem}>
								<label>Miasto</label>
								<input {...register("city")} />
								<p className={styles.error}>{errors.city?.message}</p>
							</div>
							<div className={styles.inputItem}>
								<label>Kod pocztowy</label>
								<input {...register("postal_code")} />
								<p className={styles.error}>{errors.postal_code?.message}</p>
							</div>
						</div>
						<div className={styles.inputColumn}>
							<div className={styles.inputItem}>
								<label>Kraj</label>
								<input {...register("country")} />
								<p className={styles.error}>{errors.country?.message}</p>
							</div>
							<div className={styles.inputItem}>
								<label>Metoda płatności</label>
								<select {...register("payment_method")}>
									<option value="card">Karta płatnicza</option>
									<option value="paypal">PayPal</option>
									<option value="blik">BLIK</option>
									<option value="home">Płatność przy odbiorze</option>
								</select>
								<p className={styles.error}>{errors.payment_method?.message}</p>
							</div>
						</div>
					</div>
					<button type="submit" disabled={loading}>
						{loading ? "Wysyłanie..." : "Złóż zamówienie"}
					</button>
				</form>
			</div>
			{showNotification && <NotificationModal message={notificationMessage} />}
		</>
	);
}
