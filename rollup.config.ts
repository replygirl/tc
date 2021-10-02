import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import swc from 'rollup-plugin-swc'

import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: './src/index.ts',

  // https://rollupjs.org/guide/en/#external
  external: [],

  plugins: [
    resolve({ extensions }),
    commonjs(),
    swc({
      env: {
        coreJs: '3',
      },
    }),
  ],

  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
}
