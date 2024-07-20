module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  settings: {
    tailwindcss: {
      callees: ["twMerge", "createTheme"],
      classRegex: "^(class(Name)|theme)?$",
    },
  },
};