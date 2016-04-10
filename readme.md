# lazy-progressive-enhancement.js

A lazy image loading javascript function which enforces progressive enhancement and valid HTML.

Also works on iframes.

  > - [Basic usage and design](#basic-usage)
  > - [Load specific images](#load-specific-images)
  > - [onload function](#onload-function)

## Basic usage and design

By default, the function targets every `noscript` element on the page.

Any attributes the image has in noscript (`class` / `id` / etc) are kept.

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
 2. A NodeList (from something like `document.querySelectorAll`)
 3. A singular Element (from something like `document.querySelector`)

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
