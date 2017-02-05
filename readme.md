# Lazy Progressive Enhancement

### [Download, copy-paste, whatever ;)](lazy-progressive-enhancement.min.js)

**[View website](http://tylerdeitz.co/lazy-progressive-enhancement/)**

A lazy image loader designed to enforce progressive enhancement and valid HTML.

Not a framework, not a library, just a function (with clean af markup).

``` html
<noscript><img …></noscript>
```

``` js
loadMedia(
   element,
   onload,
   scroll
)
```
**element:** *CSS String | NodeList | Element (optional)* – loads all images if not set

**onload:** *Function (optional)*

**scroll:** *Boolean (optional)* – loads image when visible

### Benefits of Lazy Progressive Enhancement
 - Designed to enforce progressive enhancement and valid HTML.
 - Written in pure JS -- no dependencies.
 - Not a framework, not a library, just a function.
 - Works with responsive `srcset` images.
 - Works with iframes.

Other lazy loaders promote [invalid HTML](https://www.w3.org/TR/html5/embedded-content-0.html#attr-img-src) by omitting the src attribute, or aren't compatible for users without javascript.

### Contents
 - [Basic Usage](#basic-usage)
 - [Load Specific Images](#load-specific-images)
 - [onload Function](#onload-function)
 - [Scroll-Based Loading](#scroll-based-loading)
 - [Build](#build)

## Basic Usage

By default, the function targets every `noscript` element on the page.

Any attributes the image has in noscript (`class` / `id` / `alt` / etc) are kept.

`HTML`
```html
<noscript><img alt="hello!" …></noscript>
```

`JS`
```js
loadMedia()
```

`End result HTML`
```html
<img alt="hello!" …>
```

## Load Specific Images

You can specify what images to load by passing in either
 1. A CSS selector string (use if calling the function before `DOMContentLoaded`)
 2. A NodeList of `noscript`s (from something like `document.querySelectorAll`)
 3. A singular `noscript` Element (from something like `document.querySelector`)

`HTML`
```html
<noscript id="this-one"><img …></noscript>
<noscript id="not-this-one"><img …></noscript>
```

`JS`
```js
loadMedia('#this-one')
```

`End result HTML`
```html
<img …>
<noscript id="not-this-one"><img …></noscript>
```

## onload Function

You can hook an onload function for every loaded image

`JS`
```js
loadMedia(null, function() {
   this.classList.add('loaded')
})
```

`End result HTML`
```html
<img class="loaded" …>
```

## Scroll-Based Loading

There's a default function to load images when they're scrolled into view.

This is a general solution, creating your own scroll-based loading functionality may be more performant.

Will be updated to use [intersection observers](https://github.com/WICG/IntersectionObserver) when it becomes standardized.

`JS`
``` js
loadMedia(null, null, true)
```

## Build
`uglifyjs lazy-progressive-enhancement.js -m --comments > lazy-progressive-enhancement.min.js`

## Thanks
[@agarzola](https://github.com/agarzola), [@raglannyc](https://github.com/raglannyc)

--
[MIT License (MIT)](LICENSE)
