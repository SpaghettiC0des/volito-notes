// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  extends: [
    "@react-native",
    "expo",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["prettier", "jest"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      "error",
      {
        ignoreCase: true,
        reservedFirst: true,
        shorthandFirst: true,
        callbacksLast: true,
      },
    ],
    "react-native/sort-styles": [
      "error",
      "asc",
      { ignoreClassNames: false, ignoreStyleProperties: false },
    ],
    "react-native/no-unused-styles": "error",
    "react-native/no-inline-styles": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/namespace": "off",
    "import/prefer-default-export": "off",
    "import/export": "error",
    "import/no-cycle": "error",
    "import/no-anonymous-default-export": "error",
  },
};
