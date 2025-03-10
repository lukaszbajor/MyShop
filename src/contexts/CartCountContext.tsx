import { createContext, useState, useEffect } from "react";

// Tworzymy kontekst, który przechowuje liczbę produktów w koszyku
export const CartCountContext = createContext({
	cartCount: 0,
	updateCartCount: () => {},
});

export const CartCountProvider = ({ children }) => {
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
