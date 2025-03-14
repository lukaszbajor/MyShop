// import "./styles/variables.scss";
// import "./styles/global.scss";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ProductDetails } from "./views/ProductDetails/ProductDetails";
import { ProductsList } from "./views/ProductsList/ProductsList";
// import { MainPage } from "./views/MainPage/MainPage.tsx";
import { Cart } from "./views/Cart/Cart.tsx";
import { MainPage } from "./views/MainPage/MainPage.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { Favourites } from "./views/Favourites/Favourites.tsx";
import { ProductDetails } from "./views/ProductDetails/ProductDetails.tsx";
import { Order } from "./views/Order/Order.tsx";

const queryClient = new QueryClient();

const defaultGender = "womens";

const router = createBrowserRouter(
	[
		{
			path: "",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <Navigate to={`/${defaultGender}`} />, // Przekierowanie na domyślny gender, np. womens
				},
				{
					path: "/:gender?",
					element: <MainPage />,
				},
				{
					path: "/cart",
					element: <Cart />,
				},
				{
					path: "/favourites",
					element: <Favourites />,
				},
				{
					path: "/:gender/:category?/:subcategory?",
					element: <ProductsList />,
				},
				{
					path: "/:gender?/:category/:subcategory/product_details/:id",
					element: <ProductDetails />,
				},
				{
					path: "/order",
					element: <Order />,
				},
			],
		},
	],
	{ basename: "/MyShop" }
);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}></RouterProvider>
		</QueryClientProvider>
	</StrictMode>
);
