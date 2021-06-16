export default {
  entry: 'src/index.js',
  esm: { type: 'rollup' },
  cjs: { type: 'babel', lazy: true },
  lessInRollupMode: {
		compress: true
	},
  lessInBabelMode: true,
};
