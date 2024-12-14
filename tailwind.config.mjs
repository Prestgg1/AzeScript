/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  primary: {
			50: '#fff7ed',
			100: '#ffedd5',
			200: '#fed7aa',
			300: '#fdba74',
			400: '#fb923c',
			500: '#f97316',
			600: '#ea580c',
			700: '#c2410c',
			800: '#9a3412',
			900: '#7c2d12',
		  }
		}
	  },
	},
	plugins: [
	  require('@tailwindcss/typography'),require('daisyui'),
	],
	daisyui: {
		themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: "light", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ":root", // The element that receives theme color CSS variables
	  },
	  
  }