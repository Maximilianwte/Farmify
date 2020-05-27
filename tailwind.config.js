module.exports = {
  theme: {
    extend: {
      spacing: {
        "76": "14rem",
        "90": "20rem",
        "96": "24rem",
        "128": "40rem",
        "132": "44rem",
        "600px": "600px"
      },
      borderRadius: {
        'none': '0px',
        'sm': '7px',
        'full': '9999px'
      }
     },
    colors: {
      bg_primary: "var(--bg-primary)",
      bg_secondary: "var(--bg-secondary)",
      main_primary: "var(--main-primary)",
      main_secondary: "var(--main-secondary)",
      light: "var(--light)",
      dark: "var(--dark)",
      main_focus: "var(--main-focus)",
      main_focus_active: "var(--main-focus-secondary)",
      green: "var(--green)",
      green_active: "var(--green_active)",
      blue: "var(--blue)",
      blue_active: "var(--blue_active)",
      red: "var(--red)",
      red_active: "var(--red_active)",
      yellow: "var(--yellow)",
      yellow_active: "var(--yellow_active)",
    },
    borderRadius: {
      "xl": "1rem"
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
  },
  plugins: []
}
