import { supabase } from "../supabaseClient";

export const fetchProductById = async (id: string) => {
	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", id) // Zapytanie, które pobiera produkt o konkretnym ID
		.single(); // Zakładając, że ID jest unikalne, zwróci jeden produkt

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
