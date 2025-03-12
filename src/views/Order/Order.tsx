import { useState } from "react";
import { OrderDetails } from "../../components/OrderDetails/OrderDetails";
import { FullWidthButton } from "../../components/FullWidthButton/FullWidthButton";
import { Link } from "react-router-dom";

export function Order() {
	const [orderSubmitted, setOrderSubmitted] = useState(false);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "50vh",
				padding: "5px",
			}}
		>
			{!orderSubmitted ? (
				<OrderDetails onOrderSubmit={() => setOrderSubmitted(true)} />
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "flex-start",
						padding: "20px",
						border: "2px solid gray",
						textAlign: "center",
					}}
				>
					<h2>Dziękujemy za zamówienie! 🎉</h2>
					<p
						style={{
							padding: "20px 0",
						}}
					>
						Otrzymaliśmy Twoje zamówienie i przetwarzamy je.
					</p>
					<FullWidthButton>
						<Link to={"/"} style={{ color: "white" }}>
							Strona główna
						</Link>
					</FullWidthButton>
				</div>
			)}
		</div>
	);
}
