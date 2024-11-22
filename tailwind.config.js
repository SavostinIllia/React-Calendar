/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "drk-bg": "var(--drk-bg)",
        turquoise: "var(--turqoise)",
        "txt-color": "var(--text-color)",
        "thm-bg": "var(--thm-bg)",
      },
      spacing: {
        "550px": "550px",
      },
      padding: {
        "20px": "20px",
        "40px": "40px",
      },
      gap: {
        "15px": "15px",
      },
      borderRadius: {
        "l-24px": "24px 0 0 24px",
      },
      boxShadow: {
        custom: "0px 0px 38px -2px rgba(66, 68, 90, 0.5);",
      },
    },
  },
  plugins: [],
};
