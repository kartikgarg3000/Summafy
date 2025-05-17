import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
<<<<<<< Updated upstream
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:tailwindcss/recommended',
    ],
    plugins: 'prettier',
    rules: {
      'prettier/prettier': 'error',
      'react/no-escape-entities': 'off',
    },
  }),
];

export default eslintConfig;
=======
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
>>>>>>> Stashed changes
