# node-tiny-template

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

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

You can create as many config files as you like and store them wherever you want but you'll need to tell Tiny Template about them using the `-c` flag

```sh
tiny-template -c "path/to/custom-config.js"
```

### "scripts"

To run template you'll probably need to add it to your `"scripts"` in `'package.json'`

```sh
"scripts": {
  "tiny-template": "tiny-template"
}
```

If you prefer you can alternatively install globally

```sh
npm i node-tiny-template -g
```

### Useage

A simple useage example would then look like this:

```sh
npm run -- tiny-template -e "components" -d "app-component"
```

`-e` Entry: This is an array within a config object in the config file.

`-d` Directory: This is the name of the directory to make. If no `'name'` key is defined in the config object Tiny Template will name your file using name passed in on the `'-d'` flag.

The above example will create a file called `'app-component'` in a directory called `'app-component'`

The file extension is determined by the `'extension'` key from the config file.

The location of this directory is defined by the `'output'` key in the config object. In this demo the output path is `'examples/components/'`

Tiny Templates runs from `'process.cwd()'` so all paths will be relative to the root of your project.

### Config continued...

In order for the above to work Tiny Template needs the entry to be present in the config file.

```sh
const config = {
  components: [
    {
      output: 'examples/components',
      extension: '.js',
      format: 'pascalCase',
      template: 'examples/templates/components-js'
    }
  ]
};
```

The result will be a .js file caled `'app-component'` (Because `'name'` is not defined Tiny Template will create a `'name'` key from the `-d` flag)

Adding a key called `'name'` overides this.

The resulting .js file is compiled by using the template `'components-js.hbs'`

..which looks like this:

`examples/templates/components-js`

```sh
import * as React from 'react';

const {{{name}}} = () => {

  return (
    <div>
      <p>{{{name}}}</p>
    </div>
  );
};

export default {{{name}}};
```

..and outputs like this:

`examples/components/app-component/app-component.js`

```sh
import * as React from 'react';

const MyComponent = () => {

  return (
    <div>
      <p>MyComponent</p>
    </div>
  );
};

export default MyComponent;
```

The format of `{{{name}}}` is determined by the `'format'` key in the config object.

### Formats

Tiny Template uses [change-case](https://www.npmjs.com/package/change-case) for the formats. More info [here](https://github.com/blakeembrey/change-case)

_Available formats_:

* `camel`
* `constant`
* `dot`
* `header`
* `isLower`
* `isUpper`
* `lower`
* `lcFirst`
* `no`
* `param`
* `pascal`
* `path`
* `sentence`
* `snake`
* `swap`
* `title`
* `upper`
* `ucFirst`

### Help

Familiarise yourself with the flags, some are optional, others are required.

```sh
tiny-template -h
```

```sh
-v, --version               output the version number
-c, --config [optional]     optional path to config file
-e, --entry <required>      required array from config object
-d, --directory <required>  required output directory
-h, --help                  output usage information
```

### License

MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
