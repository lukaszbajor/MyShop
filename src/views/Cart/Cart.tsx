import { useContext, useEffect, useState } from "react";
import { CartProductsList } from "../../components/CartProductsList/CartProductsList";
import { CartSummary } from "../../components/CartSummary/CartSummary";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { ProductTypes } from "../../types/ProductTypes";
import { CartCountContext } from "../../contexts/CartCountContext";

export function Cart() {
	const [cartProducts, setCartProducts] = useState<ProductTypes[]>([]);

	const { updateCartCount } = useContext(CartCountContext);

	// Funkcja do wczytania produktów z localStorage
	const updateCart = () => {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCartProducts(cart);
	};

	// Funkcja do usuwania produktu z koszyka
	const removeFromCart = (productId: number) => {
		const updatedCart = cartProducts.filter(
			(product) => product.id !== productId
		);
		localStorage.setItem("cart", JSON.stringify(updatedCart)); // Zaktualizuj localStorage
		setCartProducts(updatedCart); // Zaktualizuj stan

		updateCartCount();
	};

	// Wczytanie koszyka po pierwszym renderze
	useEffect(() => {
		updateCart();
	}, []);
	return (
		<FlexContainer>
			<CartProductsList
				products={cartProducts}
				removeFromCart={removeFromCart}
			/>
			<CartSummary products={cartProducts} />
		</FlexContainer>
	);
}
