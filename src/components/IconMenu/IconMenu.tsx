import { Link } from "react-router-dom";
import styles from "./IconMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartCountContext } from "../../contexts/CartCountContext";

export function IconMenu() {
	const { cartCount } = useContext(CartCountContext);
	return (
		<ul className={styles.iconMenu}>
			<li>
				<Link to="/favourites" aria-label="Ulubione">
					<FontAwesomeIcon icon={faHeart} className={styles.icon} />
				</Link>
			</li>
			<li>
				<Link to="/cart" aria-label="Koszyk">
					<FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
					<div className={styles.numberOfProducts}>{cartCount}</div>
				</Link>
			</li>
		</ul>
	);
}
