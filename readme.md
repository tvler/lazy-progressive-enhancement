# lazy-progressive-enhancement.js

### [Download, copy-paste, whatever ;)](lazy-progressive-enhancement.min.js)

**[View website](http://tylerdeitz.co/lazy-progressive-enhancement/)**

A lazy image loader designed to enforce progressive enhancement and valid HTML.

``` js
loadMedia (
   element,
   onload,
   scroll
)
```
*element:* CSS String | NodeList | Element

*onload:* Function (optional)

*scroll:* Boolean (optional) – loads image when visible

Most lazyload image libraries work by having the user specify an image's source file in a data-attribute, which sets its `src` after a page is loaded. This is [invalid HTML](https://www.w3.org/TR/html5/embedded-content-0.html#attr-img-src) and disregards users who don't have a javascript-enabled browser.

### Benefits of lazy-progressive-enhancement.js
 - Designed to enforce progressive enhancement and valid HTML.
 - Written in pure JS -- no dependencies.
 - Not a framework, not a library, just a function.
 - Also works on iframes.

### Contents
 - [Basic usage](#basic-usage)
 - [Load specific images](#load-specific-images)
 - [onload function](#onload-function)
 - [Scroll-based loading](#scroll-based-loading)

## Basic usage

By default, the function targets every `noscript` element on the page.

Any attributes the image has in noscript (`class` / `id` / `alt` / etc) are kept.

`HTML`
```html
<noscript><img alt="hello!" src="..."></noscript>
```

`JS`
```js
loadMedia();
```

`End result HTML`
```html
<img alt="hello!" src="...">
```

## Load specific images

You can specify what images to load by passing in either
 1. A CSS selector string (use if calling the function before `DOMContentLoaded`)
 2. A NodeList of `noscript`s (from something like `document.querySelectorAll`)
 3. A singular `noscript` Element (from something like `document.querySelector`)

`HTML`
```html
<noscript id="this-one"><img src="..."></noscript>
<noscript id="not-this-one"><img src="..."></noscript>
```

`JS`
```js
loadMedia('#this-one');
```

`End result HTML`
```html
<img src="...">
<noscript id="not-this-one"><img src="..."></noscript>
```

## onload function

You can hook an onload function for every loaded image

`JS`
```js
loadMedia('#this-one', (function() {
  this.classList.add('loaded');
));
```

`End result HTML`
```html
<img class="loaded" src="...">
<noscript id="not-this-one"><img src="..."></noscript>
```

## Scroll-based loading

There's a default function to load images when they're scrolled into view.

This is a general solution, creating your own scroll-based loading functionality may be more performant.

Will be updated to use [intersection observers](https://github.com/WICG/IntersectionObserver) when it becomes standardized.

`JS`
``` js
loadMedia(null, null, true)
```

## Build
`uglifyjs lazy-progressive-enhancement.js -m --comments > lazy-progressive-enhancement.min.js`

[The MIT License (MIT)](LICENSE)

## Thanks
[@agarzola](https://github.com/agarzola), [@raglannyc](https://github.com/raglannyc)
