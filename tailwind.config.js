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
        "current-day": "var(--current-day)",
        "additional-txt-color": "var(--additional-txt-color)",
        "flat-orange": "var(--flat-orange)",
        "board-bg": "var(--board-bg)",
        violet: "var(--violet)",
      },
      backgroundImage: {
        arrsvg: "url('./static/images/arrow_white.svg')",
        addsvg: "url('./static/images/add.svg')",
        trashsvg: "url('./static/images/trash.svg')",
        "thm-gradient": "var(--thm-gradient)",
      },
      spacing: {
        "700px": "700px",
        "450px": "450px",
        "300px": "300px",
      },
      padding: {
        "10px": "10px",
        "20px": "20px",
        "30px": "30px",
        "40px": "40px",
      },
      gap: {
        "15px": "15px",
      },
      borderRadius: {
        "l-24px": "24px 0 0 24px",
        "g-24px": "24px",
      },
      boxShadow: {
        custom: "0px 25px 45px rgba(0,0,0, 0.3);",
        inputShadow: "0px -2px 10px 0px rgba(66, 68, 90, 1);",
        xxs: "1px 1px 1px 1px rgba(0,0,0, .2);",
      },
    },
  },
  plugins: [],
};
