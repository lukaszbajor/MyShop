import styles from "./CartProductsList.module.scss";
import { ProductTypes } from "../../types/ProductTypes";
import { CoreContent } from "../CoreContent/CoreContent";
import { CartProduct } from "../CartProduct/CartProduct";
import { useContext, useEffect, useState } from "react";
import { CartCountContext } from "../../contexts/CartCountContext";

interface CartProductsListProps {
	products: ProductTypes[];
	removeFromCart: (productId: number) => void;
}

export function CartProductsList({
	products,
	removeFromCart,
}: CartProductsListProps) {
	return (
		<CoreContent>
			<div className={styles.favouritesList}>
				<h2>Koszyk</h2>
				{products.length === 0 ? (
					<p className={styles.emptyCart}>Koszyk jest pusty.</p>
				) : (
					<div>
						{products.map((product) => {
							return (
								<CartProduct
									key={product.id}
									product={product}
									removeFromCart={removeFromCart}
								/>
							);
						})}
					</div>
				)}
			</div>
		</CoreContent>
	);
}
