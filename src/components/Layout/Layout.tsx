import { useState } from "react";
import { CartCountProvider } from "../../contexts/CartCountContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { Footer } from "../Footer/Footer";
import { IconMenu } from "../IconMenu/IconMenu";
import { Logo } from "../Logo/Logo";
import { MainContent } from "../MainContent/MainContent";
import { MainMenu } from "../MainMenu/MainMenu";
import { TopBar } from "../TopBar/TopBar";
import { Outlet } from "react-router-dom";
import { CURRENCIES } from "../../constants/currency";

export function Layout() {
	const [currency, setCurrency] = useState(CURRENCIES.PLN);
	return (
		<CartCountProvider>
			<CurrencyContext value={[currency, setCurrency]}>
				<MainContent>
					<TopBar>
						<Logo />
						<MainMenu />
						<div>
							<CurrencySelector />
							<IconMenu />
						</div>
					</TopBar>
					<CategoryMenu />
					<Outlet />
				</MainContent>
				<Footer />
			</CurrencyContext>
		</CartCountProvider>
	);
}
