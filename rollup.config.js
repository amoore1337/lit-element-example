import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'dist/node_modules' },
    { src: 'index.html', dest: 'dist' },
  ],
};

const babelConfig = {
  babelrc: false,
  extensions: ['.ts', '.js'],
  ...{
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '11',
          },
        },
      ],
    ],
  }
};

const config = [
  {
    input: 'src/my-element.ts',
    output: {
      dir: 'dist',
      format: 'iife',
    },
    plugins: [
      del({ targets: 'dist/*' }),
      typescript(),
      babel(babelConfig),
      resolve(),
      copy(copyConfig),
    ],
    preserveEntrySignatures: false,
  },

  {
    input: 'src/babel-polyfills-nomodule.js',
    output: {
      file: 'dist/babel-polyfills-nomodule.js',
      format: 'iife',
    },
    plugins: [commonjs({ include: ['node_modules/**'] }), resolve()],
  },
];

export default config;
