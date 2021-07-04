import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: './src/index.browser.ts',

  // https://rollupjs.org/guide/en/#external
  external: [],

  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
    }),
  ],

  output: [
    {
      file: pkg.browser,
      format: 'iife',
      name: 'Tc',
      exports: 'default',
      plugins: [terser()],

      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },
  ],
}
