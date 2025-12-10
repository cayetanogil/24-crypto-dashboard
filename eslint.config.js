export default (async () => {
	const reactRefreshModule = await import(
		'eslint-plugin-react-refresh'
	);
	const reactRefresh =
		reactRefreshModule.default ?? reactRefreshModule;

	const tsParserModule = await import('@typescript-eslint/parser');
	const tsParser = tsParserModule.default ?? tsParserModule;

	const tsPluginModule = await import(
		'@typescript-eslint/eslint-plugin'
	);
	const tsPlugin = tsPluginModule.default ?? tsPluginModule;

	const reactHooksModule = await import('eslint-plugin-react-hooks');
	const reactHooks = reactHooksModule.default ?? reactHooksModule;

	const tsRecommendedRules =
		tsPlugin.configs?.recommended?.rules ?? {};
	const reactHooksRecommendedRules =
		reactHooks.configs?.recommended?.rules ?? {};

	return [
		{
			files: ['**/*.{js,jsx,ts,tsx}'],
			ignores: ['dist', '.eslintrc.cjs'],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					ecmaVersion: 2020,
					sourceType: 'module',
				},
			},
			plugins: {
				'react-refresh': reactRefresh,
			},
			rules: {
				'react-refresh/only-export-components': [
					'warn',
					{ allowConstantExport: true },
				],
			},
		},
		{
			files: ['**/*.{ts,tsx}'],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					ecmaVersion: 2020,
					sourceType: 'module',
				},
			},
			plugins: {
				'@typescript-eslint': tsPlugin,
				'react-hooks': reactHooks,
			},
			rules: {
				...tsRecommendedRules,
				...reactHooksRecommendedRules,
			},
		},
	];
})();
