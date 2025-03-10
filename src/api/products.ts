/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { supabase } from "../supabaseClient";

// export const fetchProducts = async () => {
// 	const { data, error } = await supabase.from("products").select("*");

// 	console.log("📦 Otrzymane dane:", data);
// 	console.log("⚠️ Błąd (jeśli jest):", error);

// 	if (error) {
// 		throw new Error(error.message);
// 	}

// 	return data || [];
// };

import { supabase } from "../supabaseClient";

export const fetchProducts = async ({ queryKey }: any) => {
	const [_key, { category, subcategory, gender }] = queryKey;

	let query = supabase.from("products").select("*");

	if (category) query = query.eq("category_path", category);
	if (subcategory) query = query.eq("subcategory_path", subcategory);
	if (gender) query = query.eq("gender_path", gender);

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}

	return data || [];
};
