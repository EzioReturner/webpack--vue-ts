import * as hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('htmlbars', xml);
import 'highlight.js/styles/atom-one-light.css';

const hljsDirective = {};
hljsDirective.install = Vue => {
  Vue.directive('hljs', {
    inserted: el => {
      const preEl = el.querySelectorAll('pre code');
      preEl.forEach(childEl => {
        hljs.highlightBlock(childEl);
      });
    }
  });
};

export default hljsDirective;
