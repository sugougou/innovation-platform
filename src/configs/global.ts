import highlight from 'highlight.js/lib/core';
import hljs_javascript from 'highlight.js/lib/languages/javascript';
import hljs_bash from 'highlight.js/lib/languages/bash';
import hljs_json from 'highlight.js/lib/languages/json';
import hljs_c from 'highlight.js/lib/languages/c';
import hljs_java from 'highlight.js/lib/languages/java';
import hljs_xml from 'highlight.js/lib/languages/xml';
import hljs_typescript from 'highlight.js/lib/languages/typescript';
import hljs_yaml from 'highlight.js/lib/languages/yaml';

export const TargetName = 'RC-Fishing'

// highlight.js
highlight.registerLanguage('javascript', hljs_javascript);
highlight.registerLanguage('bash', hljs_bash);
highlight.registerLanguage('json', hljs_json);
highlight.registerLanguage('c', hljs_c);
highlight.registerLanguage('java', hljs_java);
highlight.registerLanguage('xml', hljs_xml);
highlight.registerLanguage('typescript', hljs_typescript);
highlight.registerLanguage('yaml', hljs_yaml);

export const hljs = highlight