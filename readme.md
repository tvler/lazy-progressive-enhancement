# lazy-progressive-enhancement.js

A lazy image loading javascript function which enforces progressive enhancement and valid HTML.

Also works on iframes.

## Basic usage

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
