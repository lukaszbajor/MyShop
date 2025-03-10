import styles from "./CurrencySelector.module.scss";
import { CURRENCIES } from "../../constants/currency";
export function CurrencySelector() {
	return (
		<select className={styles.currencySelector}>
			<option value={CURRENCIES.PLN}>{CURRENCIES.PLN}</option>
			<option value={CURRENCIES.USD}>{CURRENCIES.USD}</option>
			<option value={CURRENCIES.EUR}>{CURRENCIES.EUR}</option>
		</select>
	);
}
