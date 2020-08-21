import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

import package_ from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: package_.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: package_.module,
      format: "es",
      sourcemap: true,
    },
  ],
  watch: {
    include: "src/**",
  },
  plugins: [json(), typescript(), commonjs(), resolve(), sourcemaps()],
  external: [...Object.keys(package_.dependencies || {}), ...Object.keys(package_.peerDependencies || {})],
};
