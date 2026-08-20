import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

/**
 * Configuracion plana de ESLint (el formato de ESLint 9).
 *
 * `eslint-config-next` v16 ya exporta configuraciones planas nativas, asi que
 * no hace falta el adaptador FlatCompat.
 */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "legacy/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // Todo enlace externo debe llevar rel="noopener noreferrer".
      "react/jsx-no-target-blank": ["error", { allowReferrer: false }],
    },
  },
];

export default eslintConfig;
