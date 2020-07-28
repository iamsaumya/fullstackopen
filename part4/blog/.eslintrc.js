module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2020": true,
		"jest":true
	},
	"extends": [
		"eslint:recommended",
	],
	"parserOptions": {
		"ecmaVersion": 11
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error", "always"
		],
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		"no-console": 0
	}
}
