import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'build/node_modules' },
    { src: 'node_modules/systemjs/dist/s.js', dest: 'build/node_modules/systemjs/dist' },
    { src: 'index.html', dest: 'build' },
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
      dir: 'build',
      format: 'systemjs',
    },
    plugins: [
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
      file: 'build/babel-polyfills-nomodule.js',
      format: 'iife',
    },
    plugins: [commonjs({ include: ['node_modules/**'] }), resolve()],
  },
];

export default config;
