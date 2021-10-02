import resolve from '@rollup/plugin-node-resolve'
import swc from 'rollup-plugin-swc'

import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: './src/index.browser.ts',

  // https://rollupjs.org/guide/en/#external
  external: [],

  plugins: [
    resolve({ extensions }),
    swc({
      env: {
        coreJs: '3',
      },
      minify: true,
    }),
  ],

  output: [
    {
      file: pkg.browser,
      format: 'iife',
      name: 'tc',
      exports: 'default',

      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },
  ],
}
