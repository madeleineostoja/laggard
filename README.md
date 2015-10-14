# laggard
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

Automagical CSS fallbacks for legacy browsers, built on [PostCSS][postcss].

Laggard is a pack of community PostCSS plugins that insert common CSS property fallbacks for legacy browsers (<IE8). For a full list of plugins and attributions, have a look at CONTRIBUTORS.md.

Laggard **does not** transpile future CSS syntax. For that use [cssnext][cssnext], which also includes most of these legacy fallbacks. Use Laggard if you just want to easily improve legacy support with current CSS code.

--

### Install

```sh
$ npm install --save laggard
```

<br/>

### Usage

###### Build tools
Use Laggard as a PostCSS plugin in your build tool of choice.

```js
var postcss = require('postcss'),
    laggard = require('laggard');

postcss([ laggard ])
```

See [PostCSS][postcss] docs for examples for your particular environment.

###### CLI
Process CSS directly on the command line

```sh
$ laggard src/style.css style.css [options]
```

###### Stylus
Laggard can be used directly as a Stylus plugin with [PostStylus][poststylus]

```js
stylus(css).use(poststylus('laggard'))
```

See the [PostStylus Docs][poststylus] for more examples for your environment.

--

### Features

_Opacity ms-filter fallbacks_
```css
/* Before */
.foo {
  opacity: .5;
}

/* After */
.foo {
  opacity: .5;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
}
```

_Rem unit fallbacks_
```css
html {
  font-size: 16px;
}

/* Before */
.foo {
  font-size: 2rem;
}

/* After */
.foo {
  font-size: 32px;
  font-size: 2rem;
}
```

_Rem unit fallbacks_
```css
html {
  font-size: 16px;
}

/* Before */
.foo {
  font-size: 2rem;
}

/* After */
.foo {
  font-size: 32px;
  font-size: 2rem;
}
```

_PseudoElement conversions_
```css
/* Before */
.foo::before {
  display: block;
}

/* After */
.foo:before {
  display: block;
}
```

_RGBA Hex fallbacks_
```css
/* Before */
.foo {
  background: rgba(153, 221, 153, 0.8);
}

/* After */
.foo {
  background: #99DD99;
  background: rgba(153, 221, 153, 0.8);
}
```

_IE vmin to vm fallbacks_
```css
/* Before */
.foo {
  width: 50vmin;
}

/* After */
.foo {
  width: 50vm;
  width: 50vmin;
}
```

_3D transform hack for will-change_
```css
/* Before */
.foo {
  will-change: transform;
}

/* After */
.foo {
  backface-visibility: hidden;
  will-change: transform;
}
```

--

### Options
All features in Laggard can be toggled on or off by passing options on initialization. By default all features are set to `true`.

Feature toggles:
- `rgba`
- `opacity`
- `pseudo`
- `vmin`
- `pixrem`
- `willchange`

```js
// Set in build tool, etc.
.laggard({
  // options
})
```
--

### License

MIT © [Sean King](https://twitter.com/seaneking)

[npm-image]: https://badge.fury.io/js/laggard.svg
[npm-url]: https://npmjs.org/package/laggard
[travis-image]: https://travis-ci.org/seaneking/laggard.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/laggard
[daviddm-image]: https://david-dm.org/seaneking/laggard.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/seaneking/laggard
[postcss]: https://github.com/postcss/postcss
[cssnext]: http://cssnext.io/
[poststylus]: https://github.com/seaneking/poststylus
