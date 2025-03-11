import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/MyShop/",
	css: {
		preprocessorOptions: {
			scss: {
				// Dodaj zmienne SCSS do wszystkich plików SCSS
				additionalData: `@import '../../styles/main.scss';`,
			},
		},
	},
});
