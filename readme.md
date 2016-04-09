# lazy-progressive-enhancement.js

A lazy image loading javascript function which enforces progressive enhancement and valid HTML.

Also works on iframes.

## Basic usage

By default, the function targets every `noscript` element on the page

HTML
```html
<noscript><img src="..."></noscript>
```

JS
```js
loadMedia();
```

End result HTML
```html
<img src="...">
```

## Load specific images

You can specify what images to load by passing in either
 1. A CSS selector string
 2. A NodeList (from something like `document.querySelectorAll`)
 3. A singular Element (from something like `document.querySelector`)

HTML
```html
<noscript id="this-one"><img src="..."></noscript>
<noscript id="not-this-one"><img src="..."></noscript>
```

JS
```js
loadMedia('#this-one');
```

End result HTML
```html
<img src="...">
<noscript id="not-this-one"><img src="..."></noscript>
```
