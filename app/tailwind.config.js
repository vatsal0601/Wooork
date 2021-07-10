const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {
			textColor: ["active"],
			backgroundColor: ["active"],
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
