export interface ProductTypes {
	id: number;
	gender: string;
	gender_path: string;
	category: string;
	category_path: string;
	subcategory: string;
	subcategory_path: string;
	product_name: string;
	brand: string;
	price_pln: number;
	price_usd: number;
	photos: string[];
	description: string;
	maintenance_info: string;
	is_bestseller: boolean;
}
