import styles from "./Photos.module.scss";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import { ProductTypes } from "../../types/ProductTypes";
import { useState } from "react";

interface ProductProps {
	product: ProductTypes;
}

export function Photos({ product }: ProductProps) {
	const photos = Array.isArray(product.photos) ? product.photos : [];

	// Ustawiamy domyślne zdjęcie tylko wtedy, gdy istnieją zdjęcia
	const [currentPhoto, setCurrentPhoto] = useState(
		photos.length > 0 ? photos[0] : ""
	);

	// Jeśli zdjęcia są dostępne, renderujemy je
	if (photos.length === 0) {
		return <p>Brak zdjęć dla tego produktu.</p>;
	}
	return (
		<FlexContainer>
			<div className={styles.thumbnails}>
				{product.photos.map((photo) => {
					return (
						<img
							key={photo}
							src={photo}
							alt="jedno ze zdjęć produktu"
							className={currentPhoto === photo ? styles.active : ""}
							onClick={() => {
								setCurrentPhoto(photo);
							}}
						/>
					);
				})}
			</div>
			<img
				src={currentPhoto}
				alt="główne zdjęcie produktu"
				className={styles.mainPhoto}
			/>
		</FlexContainer>
	);
}
