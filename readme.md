# lazy-progressive-enhancement.js

A lazy image loading javascript function which enforces progressive enhancement and valid HTML.

Most lazyload image libraries work by having the user specify an image's source file in a data-attribute, and setting the `src` attribute to an `img` after a page is loaded. This is [invalid HTML](https://www.w3.org/TR/html5/embedded-content-0.html#attr-img-src) and disregards users who don't have a javascript-enabled broswer.

### Benefits of lazy-progressive-enhancement.js
 - Designed to *enforce* pregressive enhancement and valid HTML. 
 - Written in pure JS -- no dependencies. 
 - Not a framework, not a library, just a function.
 - Also works on iframes.

### [Download, copy-pase, whatever ;)](lazy-progressive-enhancement.min.js)

### Contents
 - [Basic usage](#basic-usage)
 - [Load specific images](#load-specific-images)
 - [onload function](#onload-function)

## Basic usage

By default, the function targets every `noscript` element on the page.

Any attributes the image has in noscript (`class` / `id` / `alt` / etc) are kept.

`HTML`
```html
<noscript><img class="hero-image" src="..."></noscript>
```

`JS`
```js
loadMedia();
```

`End result HTML`
```html
<img class="hero-image" src="...">
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
