/* @license
lazy-progressive-enhancement.js
https://github.com/tvler/lazy-progressive-enhancement
The MIT License (MIT)
Copyright (c) 2016 Tyler Deitz
*/

/**
 * Loads media, hooking an optional onload function,
 * optionally loading when scrolled into the viewport.
 *
 * @param {String | NodeList | Element} [media]
 *        String - (optional) A CSS selector targeting the noscript elements to be loaded.
 *        NodeList - (optional) A nodelist of noscript elements to be loaded.
 *        Element - (optional) A singular noscript element to be loaded.
 *        If not defined, targets every 'noscript' element on the page.
 * @param {Function} [onloadfn] - (optional) The onload function fired for each targeted element.
 * @param {Boolean} [scroll] - (optional) Load image when scrolled into the viewport.
 */
function loadMedia(media, onloadfn, scroll) {

   'use strict'

   var intervals = []

   // Fires replaceNoscript either on DOMContentLoaded or after
   // @see https://gist.github.com/tvler/8fd53d11ed775ebc72419bb5d96b8696
   // @author tvler
   function onwheneva() {
     replaceNoscript(media)
   }

   // Here is jQuery "ready" on vanilla
   function domReady(callback) {
     document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
   }

   domReady(onwheneva)

   function scrollVisibility(img, src, srcset) {
      var rect = img.getBoundingClientRect(),
          offset = 300
      if (
         (rect.bottom >= -offset && rect.top - window.innerHeight < offset) &&
         (rect.right >= -offset && rect.left - window.innerWidth < offset)
      ) {
         img.addEventListener("load", onloadfn) // Cause onload may be rewritten
         srcset && (img.srcset = srcset)
         img.src = src
      }
   }

   function replaceNoscript(media) {
      var noscript, img, src, srcset, parent, i = 0,

      // Smallest data URI image possible for a transparent image
      // @see http://stackoverflow.com/questions/6018611/smallest-data-uri-image-possible-for-a-transparent-image
      // @author layke
      tempSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

      if (media == null || typeof media === 'string') {
         media = document.body.querySelectorAll(media || 'noscript')
      } else if (!media.length) {
         media = [media]
      }

      while (noscript = media[i++]) {
         // Create an img element in a DOMParser so the image won't load.
         img = document.importNode((new DOMParser()).parseFromString(noscript.textContent, 'text/html').body.firstChild, true)
         parent = noscript.parentElement

         if (scroll) {
            src = img.getAttribute('src')
            srcset = img.getAttribute('srcset')
            img.src = tempSrc
            img.removeAttribute('srcset')
            parent.replaceChild(img, noscript)
            intervals.push(scrollVisibility.bind(this, img, src, srcset)) // Rather to run functions on scroll than every 100ms, don't you think so?
         } else {
            img.addEventListener("load", onloadfn)
            parent.replaceChild(img, noscript)
         }
      }
   }

   // Load visible images on page load
   domReady(function() {
     intervals.forEach(function(picture) {
         picture();
     })
   })

   // Load visible images on scroll
   document.onscroll = function() {
     intervals.forEach(function(picture) {
         picture();
     })
   }
}
