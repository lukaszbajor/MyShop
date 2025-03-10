export type Gender = {
	categoryName: string;
	categoryNamePL: string;
	path: string;
};
export type Subcategory = {
	categoryName: string;
	path: string;
};
export type Category = {
	categoryName: string;
	path: string;
	subcategories: Subcategory[];
};

export const GENDERS: Gender[] = [
	{
		categoryName: "Womens",
		categoryNamePL: "Kobieta",
		path: "womens",
	},
	{
		categoryName: "Mens",
		categoryNamePL: "Mężczyzna",
		path: "mens",
	},
	{
		categoryName: "Children",
		categoryNamePL: "Dziecko",
		path: "children",
	},
];

export const CATEGORIES: Category[] = [
	{
		categoryName: "Odzież",
		path: "clothes",
		subcategories: [
			{
				categoryName: "Koszulki",
				path: "t-shirts",
			},
			{
				categoryName: "Swetry",
				path: "sweaters",
			},
			{
				categoryName: "Bluzy",
				path: "sweatshirts",
			},
			{
				categoryName: "Bluzki",
				path: "blouses",
			},
			{
				categoryName: "Koszule",
				path: "shirts",
			},
			{
				categoryName: "Spodnie",
				path: "pants",
			},
			{
				categoryName: "Spodenki",
				path: "shorts",
			},
			{
				categoryName: "Spódnice",
				path: "skirts",
			},
			{
				categoryName: "Sukienki",
				path: "dresses",
			},
		],
	},
	{
		categoryName: "Obuwie",
		path: "footwears",
		subcategories: [
			{
				categoryName: "Eleganckie",
				path: "elegants",
			},
			{
				categoryName: "Sportowe",
				path: "sports",
			},
			{
				categoryName: "Sneakersy",
				path: "sneakers",
			},
		],
	},
	{
		categoryName: "Akcesoria",
		path: "accessories",
		subcategories: [
			{
				categoryName: "Torby",
				path: "bags",
			},
			{
				categoryName: "Zegarki",
				path: "watchs",
			},
			{
				categoryName: "Torebki",
				path: "handbags",
			},
			{
				categoryName: "Skarpety",
				path: "socks",
			},
			{
				categoryName: "Rajstopy",
				path: "tights",
			},
			{
				categoryName: "Inne",
				path: "others",
			},
		],
	},
	{
		categoryName: "Sport",
		path: "sport",
		subcategories: [
			{
				categoryName: "Piłka nożna",
				path: "football",
			},
			{
				categoryName: "Siatkówka",
				path: "volleyball",
			},
			{
				categoryName: "Piłka ręczna",
				path: "handball",
			},
			{
				categoryName: "Koszykówka",
				path: "basketball",
			},
			{
				categoryName: "Sporty zimowe",
				path: "wintersports",
			},
			{
				categoryName: "Inne",
				path: "others",
			},
		],
	},
	{
		categoryName: "Outlet",
		path: "outlet",
		subcategories: [
			{
				categoryName: "Odzież",
				path: "clothes",
			},
			{
				categoryName: "Obuwie",
				path: "footwears",
			},
			{
				categoryName: "Akcesoria",
				path: "accessories",
			},
			{
				categoryName: "Sport",
				path: "sport",
			},
			{
				categoryName: "Inne",
				path: "others",
			},
		],
	},
];
