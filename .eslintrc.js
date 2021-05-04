module.exports = {
  extends: "airbnb-typescript-prettier",
  parserOptions: {
      "project": "./tsconfig.json",
      "tsconfigRootDir": __dirname,
      "sourceType": "module"
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "ts": "never"
      }
    ],
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-await-in-loop": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-param-reassign": "off",
    "func-names": "off",
    "consistent-return": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
