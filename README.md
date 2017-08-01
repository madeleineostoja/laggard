# Laggard
[![NPM version][npm-badge]][npm-url] [![Downloads][npm-downloads]][npm-url]  [![Build Status][travis-badge]][travis-url]

Laggard automatically generates safe CSS fallbacks for legacy (<IE9) browsers. It's built on [PostCSS][postcss].

Laggard does not transpile future CSS syntax. For that use [cssnext][cssnext]. Laggard also doesn't do destructive transforms that would require you to use a separate stylesheet for legacy browsers. If that's what you're after use [Oldie][oldie]. 

Use Laggard if you just want to easily improve legacy support with your current CSS code.

### Contents

- [Install](#install)
- [Usage](#usage)
- [Features](#features)
  - [Opacity fallbacks](#opacity-fallbacks)
  - [Rem unit fallbacks](#rem-unit-fallbacks)
  - [Pseudo element conversions](#pseudo-element-conversions)
  - [RGBA Hex fallbacks](#rgba-hex-fallbacks)
  - [IE vmin to vm fallbacks](#ie-vmin-to-vm-fallbacks)
  - [3D transform hack for will-change](#3d-transform-hack-for-will-change)
- [Options](#options)

## Install

Laggard is available on NPM as `laggard`, install it with NPM or Yarn


```sh
$ yarn add laggard --dev
```

```sh
$ npm i laggard --save-dev
```

## Usage

###### Build tools

Use Laggard as a PostCSS plugin in your build tool of choice.

```js
const postcss = require('postcss');
const laggard = require('laggard');

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

## Features

#### Opacity fallbacks

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

#### Rem unit fallbacks

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

#### Pseudo element conversions

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

#### RGBA Hex fallbacks
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

#### IE vmin to vm fallbacks
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

#### 3D transform hack for will-change
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

## Options

All features in Laggard can be toggled on or off by passing options on initialization. By default all features are set to `true`.

Option              | Type    | Default | Description                                                     
------------------- | ------- | ------- | -----------                                                     
`rgba`              | Boolean | `true`  | Whether to enable RGBA fallbacks
`opacity`           | Boolean | `true`  | Whether to enable opacity fallbacks
`pseudo`            | Boolean | `true`  | Whether to enable pseudo element conversion
`vmin`              | Boolean | `true`  | Whether to enable to enable vmin fallbacks
`pixrem`            | Boolean | `true`  | Whether to enable whether to enable rem fallbacks
`willchange`        | Boolean | `true`  | Whether to enable native will-change fallbacks
`reporter`          | Boolean | `false` | Whether to log errors from plugins

```js
// Set in build tool, etc.
.laggard({
  // options
})
```

***

MIT © [Sean King](https://twitter.com/seaneking)

[npm-badge]: https://badge.fury.io/js/laggard.svg
[npm-url]: https://npmjs.org/package/laggard
[npm-downloads]: https://img.shields.io/npm/dm/laggard.svg
[travis-badge]: https://travis-ci.org/seaneking/laggard.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/laggard
[postcss]: https://github.com/postcss/postcss
[cssnext]: http://cssnext.io/
[poststylus]: https://github.com/seaneking/poststylus
[oldie]: https://github.com/jonathantneal/oldie
