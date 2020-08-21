import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

import package from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: package.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: package.module,
      format: "es",
      sourcemap: true,
    },
  ],
  watch: {
    include: "src/**",
  },
  plugins: [json(), typescript(), commonjs(), resolve(), sourcemaps()],
  external: [...Object.keys(package.dependencies || {}), ...Object.keys(package.peerDependencies || {})],
};
