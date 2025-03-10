import { CoreContent } from "../CoreContent/CoreContent";
import { Product } from "../Product/Product";
import { ProductTypes } from "../../types/ProductTypes";
import styles from "./Products.module.scss";

interface BestsellersProps {
	products: ProductTypes[];
	headerText: string;
}
export function Bestsellers({ products, headerText }: BestsellersProps) {
	return (
		<CoreContent>
			<h2 className={styles.productsHeader}>{headerText}</h2>
			<div className={styles.productsWrapper}>
				{products.map((product) => {
					return <Product key={product.id} product={product} />;
				})}
			</div>
		</CoreContent>
	);
}
