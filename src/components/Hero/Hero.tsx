import { CoreContent } from "../CoreContent/CoreContent";
import { FullWidthButton } from "../FullWidthButton/FullWidthButton";
import styles from "./Hero.module.scss";
export function Hero() {
	return (
		<div className={styles.hero}>
			<CoreContent>
				<div className={styles.wrapper}>
					<h2>Okazje nawet do 80%!</h2>
					<p className={styles.describe}>
						Jak co miesiąc, wejdź i sprawdź co dla Ciebie przygotowaliśmy.
					</p>
					<FullWidthButton onClick={() => {}}>Promocje</FullWidthButton>
				</div>
			</CoreContent>
		</div>
	);
}
