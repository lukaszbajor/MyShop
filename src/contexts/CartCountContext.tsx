/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const CartCountContext = createContext({
	cartCount: 0,
	updateCartCount: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CartCountProvider = ({ children }: any) => {
	const [cartCount, setCartCount] = useState(0);

	// Funkcja do aktualizacji liczby produktów w koszyku
	const updateCartCount = () => {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCartCount(cart.length);
	};

	// Zaktualizowanie liczby produktów przy pierwszym renderowaniu
	useEffect(() => {
		updateCartCount();
	}, []);

	return (
		<CartCountContext.Provider value={{ cartCount, updateCartCount }}>
			{children}
		</CartCountContext.Provider>
	);
};
