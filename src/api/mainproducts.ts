/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../supabaseClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMainProducts = async ({ queryKey }: any) => {
	const [_key, { category, subcategory, gender }] = queryKey;

	let query = supabase.from("products").select("*");

	if (category) query = query.eq("category_path", category);
	if (subcategory) query = query.eq("subcategory_path", subcategory);
	if (gender) query = query.eq("gender_path", gender);

	// Ograniczamy liczbę produktów do 4
	// query = query.limit(4);

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}

	return data || [];
};
