# node-tiny-template

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

[![Build Status](https://travis-ci.org/PaulieScanlon/node-tiny-template.svg?branch=master)](https://travis-ci.org/PaulieScanlon/node-tiny-template)

**_Node Tiny Template_** is a command line interface for generating templated; .html, .js, .css, and ... well, any file types you like. Intially developed to aid in the creation of standardised React components and directories but can be useful in many other projects.

Create your own templates so you and your development team always start off with the same base structure; component declaration, imports, exports etc.

After all, consistancy is the key!

## Getting Started

Install and save as development dependency.

### Install

```sh
npm i node-tiny-template --save-dev
```

### Config

Before you run Tiny Template make sure you have created a default config file and saved it to the root of your project.

The _default_ config **_must_** be named:

```sh
tiny-template.config.js
```

You can create as many config files as you like and store them wherever you want but you'll need to tell Tiny Template about them using the `-c` arg

```sh
tiny-template -c "path/to/custom-config.js"
```

### "scripts"

To run Tiny Template you'll probably need to add it to your `"scripts"` in `'package.json'`

```sh
"scripts": {
  "tiny-template": "tiny-template"
}
```

### Useage

A simple useage example would then look like this:

```sh
npm run -- tiny-template -d "new-component"
```

### Config continued...

In order for Tiny Template to do it's thing the config file must contain the required objects and object keys. An example configuration could look like this.

```sh
const path = require('path');

const paths = {
	templates: 'examples/templates'
};

const config = {
	directory: {
		format: 'paramCase',
		output: 'examples/components'
	},
	files: [
		{
			extension: 'js',
			format: 'camelCase',
			template: `${paths.templates}/components-js.hbs`
		},
		{
			name: 'styles',
			extension: 'css',
			format: 'paramCase',
			template: `${paths.templates}/components-css.hbs`
		}
	],
	onComplete: options => {
		console.log(options);
	}
};

module.exports = config;
```

- `directory`: Object; `<required>`

  - `format`: String; `<required>`
  - `output`: String; `<required>`

- `files`: Array; `<required>`

  - `name`: String; `<optional>`
  - `extension`: String; `<required>`
  - `format`: String; `<required>`
  - `template`: String; `<required>`

- `onComplete`: Function; `<optional>`
  Can be used to trigger something else you'd like to do after the files have been created. - options

Options returns a number of case formatted variants of the name and dir keys. These same keys are available for use with your handlebars templates. Access them like this `{{{name.camelCase}}}` or `{{{directory.constandCase}}}`

- directory

  - unformatted
  - camelCase
  - constantCase
  - paramCase
  - pascalCase
  - snakeCase
  - noCase

- name
  - formatted
  - camelCase
  - constantCase
  - paramCase
  - pascalCase
  - snakeCase
  - noCase

### License

MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
