import styles from "./CurrencySelector.module.scss";
import { CURRENCIES } from "../../constants/currency";
import { useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";
export function CurrencySelector() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const [currency, setCurrency] = useContext(CurrencyContext);
	console.log(currency);
	return (
		<select
			className={styles.currencySelector}
			onChange={(e) => {
				setCurrency(e.target.value);
			}}
		>
			<option value={CURRENCIES.PLN}>{CURRENCIES.PLN}</option>
			<option value={CURRENCIES.USD}>{CURRENCIES.USD}</option>
			<option value={CURRENCIES.EUR}>{CURRENCIES.EUR}</option>
		</select>
	);
}
