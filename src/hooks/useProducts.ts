// import { useQuery } from "@tanstack/react-query";
// import { fetchProducts } from "../api/products";

// export const fetchProducts = async () => {
// 	const { data, error } = await supabase.from("products").select("*");

// 	if (error) {
// 		throw new Error(error.message); // TanStack Query obsłuży błędy
// 	}

// 	return data || [];
// };