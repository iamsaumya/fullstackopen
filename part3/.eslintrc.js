module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2020': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 11
	},
	'rules': {
		'eqeqeq': 'error',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error', 'always'
		],
		'arrow-spacing': [
			'error', { 'before': true, 'after': true }
		],
		'no-console': 0
	}
}
