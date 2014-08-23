{
	appDir:  '../source',

	dir: '../build',

	mainConfigFile: '../source/js/app.js',

	stubModules: ['text'],
	removeCombined: true,
	optimizeCss: "standard",

	modules: [
		{
			name: 'app',
		}
	],

	uglify: {
        max_line_length: 1000,        
    },
}