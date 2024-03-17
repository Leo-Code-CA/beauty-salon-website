import scrollToElem from './scrollDirection.js';

export default function redirect(href, elem) {
    window.location.href = href;
    scrollToElem(elem);
}