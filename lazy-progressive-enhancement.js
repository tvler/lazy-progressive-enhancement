/**
 * Loads media, hooking an optional onload function.
 *
 * @param {String | NodeList | Element} [media]
 *        String - (optional) A CSS selector targeting the noscript elements to be loaded.
 *        NodeList - (optional) A nodelist of noscript elements to be loaded.
 *        Element - (optional) A singular noscript element to be loaded.
 *        If not defined, targets every 'noscript' element on the page.
 * @param {Function} - [onload] - (optional) The onload function fired for each targeted element.
 */
function loadMedia(media, onload) {

   'use strict';

   /**
    * Creates a new element based of noscript's contents.
    * Hooks the onload function.
    * Replaces the noscript element with the created element.
    *
    * @param {String | NodeList | Element} [media]
    *        String - (optional) A CSS selector targeting the noscript elements to be loaded.
    *        NodeList - (optional) A nodelist of noscript elements to be loaded.
    *        Element - (optional) A singular noscript element to be loaded.
    *        If not defined, targets every 'noscript' element on the page.
    * @param {Function} - [onload] - (optional) The onload function fired for each targeted element.
    */
   function replaceNoscript(media, onload) {
      if (media === undefined) {
         media = document.querySelectorAll('noscript');
      } else if (media instanceof Element) {
         media = [media];
      } else if (typeof media === 'string') {
         media = document.querySelectorAll(media);
      }

      for (var i = 0, noscript, img; i < media.length; i++) {
         (img = document.createElement('div')).innerHTML = (noscript = media[i]).textContent || (noscript = media[i]).innerHTML;
         img.firstChild.onload = onload;
         noscript.parentElement.replaceChild(img.firstChild, noscript);
      }
   }

   /**
    * Fires replaceNoscript either on DOMContentLoaded or after
    *
    * @see https://gist.github.com/tvler/8fd53d11ed775ebc72419bb5d96b8696
    * @author tvler
    */
    var onwheneva = (function() {
      replaceNoscript(media, onload);
    });

   if (document.readyState !== 'loading') {
      onwheneva();
   } else {
      document.addEventListener('DOMContentLoaded', onwheneva);
   }
}
