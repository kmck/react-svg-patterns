(this["webpackJsonpreact-svg-patterns-example"]=this["webpackJsonpreact-svg-patterns-example"]||[]).push([[0],{100:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n(0),a=n(43),i=n.n(a),c=n(5),s=n(6),l=n(4),f=n(44),u=n(23),d=n.n(u),p=n(48),h=n.n(p),g="pad",b=Math.PI/180,m=function(){return(m=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function v(t,e){var n="function"===typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,a=n.call(t),i=[];try{for(;(void 0===e||e-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function j(t){try{return h()(t)}catch(e){return{red:0,green:0,blue:0,alpha:0}}}var y=function(t){return t.replace(/\s/g,"-")};function O(t,e){return function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(v(arguments[e]));return t}(t).sort((function(t,n){return t[e]>n[e]?1:t[e]<n[e]?-1:0}))}function x(t,e,n){void 0===e&&(e=1),void 0===n&&(n=g);var r=O(t,"offset"),o=r[0],a=r[r.length-1],i=r.length,c=new Map;return function(t){if(c.has(t))return c.get(t);var s=t/e;if(s<0||s>1)switch(n){case"reflect":s=Math.abs(s)%2,1===Math.floor(s)&&(s=-s),(s%=1)<0&&(s+=1);break;case"repeat":0!==s&&(s%=1),s<=0&&t&&(s+=1)}var l=function(t){for(var e=i-1;e>=0;e-=1)if(t>=r[e].offset)return r[e]}(s)||o,f=function(t){for(var e=0;e<i;e+=1)if(t<=r[e].offset)return r[e]}(s)||a,u=f.offset!==l.offset?(s-l.offset)/(f.offset-l.offset):1,p=function(t,e,n){void 0===n&&(n=.5);var r=j(t),o=r.red,a=r.green,i=r.blue,c=r.alpha,s=j(e),l=s.red,f=s.green,u=s.blue,p=s.alpha,h=2*n-1,g=p-c,b=((h*g===-1?h:(h+g)/(1+h*g))+1)/2,m=1-b,v=Math.round(m*o+b*l),y=Math.round(m*a+b*f),O=Math.round(m*i+b*u),x=c*n+p*(1-n);return"#"+(x<1?d()(v,y,O,x):d()(v,y,O))}(l.color,f.color,u);return c.set(t,p),p}}function w(t,e,n,r,o){var a=x(e,n,r),i=Math.ceil(8/o),c=1/o/i;return new Array(o).fill(0).map((function(e,n){var r=a(o>1?n/(o-1):0),s=n/o,l=new Array(n===o-1?i+2:i+3).fill(0).map((function(e,n){return n?function(t){return[.5+Math.sin(t*b),.5-Math.cos(t*b)]}(360*(s+c*(n-1))+t):[.5,.5]}));return{key:s,fill:r,points:l.map((function(t){return t.join(",")})).join(" ")}}))}function M(t){var e=!1,n=t.length,r=t.map((function(t,r){return"object"!==typeof t||null==t.offset?(e=!0,{offset:r/(n-1),color:"object"===typeof t?t.color:t}):t}));return e?r:t}var S=Object(o.memo)((function(t){var e,n=t.offset,r=t.color;return Object(o.createElement)("stop",{offset:(e=n,"number"===typeof e?100*e+"%":e),stopColor:r})})),E=Object(o.memo)((function(t){var e=t.angle,n=void 0===e?0:e,r=t.from,a=void 0===r?"inherit":r,i=t.id,c=t.scale,s=void 0===c?1:c,l=t.spreadMethod,f=void 0===l?g:l,u=t.stops,d=t.to,p=void 0===d?"inherit":d,h=Object(o.useMemo)((function(){return M(u||[a,p])}),[a,p,u]),v=Object(o.useMemo)((function(){var t=n*b,e=s*Math.sin(t),r=s*Math.cos(t),o=Math.max(-e,0),a=Math.max(0,e),i=Math.max(r,0),c=Math.max(0,-r),l=.5*(1-Math.abs(a-o)),f=.5*(1-Math.abs(c-i));return{x1:o+l,x2:a+l,y1:i+f,y2:c+f}}),[n]),j=v.x1,y=v.x2,O=v.y1,x=v.y2;return Object(o.createElement)("linearGradient",{id:i,x1:j,x2:y,y1:O,y2:x,spreadMethod:f},h.map((function(t,e){return Object(o.createElement)(S,m({key:null!=t.offset?t.offset:e},t))})))})),k=Object(o.memo)((function(t){var e=t.cx,n=void 0===e?.5:e,r=t.cy,a=void 0===r?.5:r,i=t.from,c=void 0===i?"inherit":i,s=t.fx,l=void 0===s?.5:s,f=t.fy,u=void 0===f?.5:f,d=t.id,p=t.r,h=void 0===p?.5:p,b=t.spreadMethod,v=void 0===b?g:b,j=t.stops,y=t.to,O=void 0===y?"inherit":y,x=Object(o.useMemo)((function(){return M(j||[c,O])}),[c,O,j]);return Object(o.createElement)("radialGradient",{id:d,cx:n,cy:a,fx:l,fy:u,r:h,spreadMethod:v},x.map((function(t,e){return Object(o.createElement)(S,m({key:null!=t.offset?t.offset:e},t))})))})),P=Object(o.memo)((function(t){var e=t.angle,n=void 0===e?0:e,r=t.from,a=void 0===r?"inherit":r,i=t.id,c=t.scale,s=void 0===c?1:c,l=t.slices,f=void 0===l?100:l,u=t.stops,d=t.spreadMethod,p=void 0===d?g:d,h=t.to,b=void 0===h?"inherit":h,m=Object(o.useMemo)((function(){return M(u||[a,b])}),[a,b,u]),v=Object(o.useMemo)((function(){return w(n,m,s,p,f)}),[n,m,s,p,f]);return Object(o.createElement)("pattern",{height:1,id:i,patternUnits:"objectBoundingBox",patternContentUnits:"objectBoundingBox",width:1},v.map((function(t){var e=t.key,n=t.fill,r=t.points;return Object(o.createElement)("polygon",{key:e,fill:n,points:r})})))})),C=Object(o.memo)((function(t){var e=t.id,n=t.src,r=void 0===n?"":n;return Object(o.createElement)("pattern",{height:1,id:e,patternContentUnits:"objectBoundingBox",patternUnits:"objectBoundingBox",width:1},Object(o.createElement)("image",{height:1,width:1,x:0,xlinkHref:r,y:0}))})),B=Object(o.memo)((function(t){var e=t.children,n=void 0===e?null:e,r=t.id;return Object(o.createElement)("pattern",{height:1,id:r,patternContentUnits:"objectBoundingBox",patternUnits:"objectBoundingBox",width:1},"function"===typeof n?n(r):n)}));var N=function(){var t=window.navigator.userAgent;return Object(o.useMemo)((function(){return function(t){return/Safari/.test(t)&&!/Chrome/.test(t)}(t)}),[t])?Object(o.createElement)("animateTransform",{attributeName:"transform",attributeType:"XML",type:"translate",from:"0, 0",to:"0, 0",dur:"1s",repeatCount:"indefinite"}):null},T=function(){function t(t){var e=this;void 0===t&&(t="svg-pattern"),this.patterns=new Map,this.listeners=new Set,this.subscribe=function(t){return e.listeners.add(t),function(){}},this.add=function(t,n,r){var o=y(t),a=r,i={key:t,id:e.idPrefix+"-"+n+"__"+o,props:a,type:n};return e.patterns.set(o,i),e.dispatch(),o},this.get=function(t){var n=y(t),r=e.patterns.get(n);return r?"url(#"+r.id+")":void 0},this.has=function(t){return e.patterns.has(y(t))},this.remove=function(t){var n=y(t);e.patterns.has(n)&&(e.patterns.delete(n),e.dispatch())},this.getPatterns=function(){var t,n,r={};try{for(var o=function(t){var e="function"===typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"===typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}(e.patterns.entries()),a=o.next();!a.done;a=o.next()){var i=v(a.value,2),c=i[0],s=i[1];r[c]=s}}catch(l){t={error:l}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}return r},this.idPrefix=t}return t.prototype.dispatch=function(){this.listeners.forEach((function(t){t()}))},t}(),L=Object(o.memo)((function(t){var e=t.patterns,n=void 0===e?{}:e,r=t.noSvgWrapper,a=void 0!==r&&r,i=Object(o.useMemo)((function(){return Object.entries(n).map((function(t){var e=v(t,2),n=e[0],r=e[1],a=r.id,i=r.props;switch(r.type){case"linear":return Object(o.createElement)(E,m({key:n,id:a},i));case"radial":return Object(o.createElement)(k,m({key:n,id:a},i));case"angular":return Object(o.createElement)(P,m({key:n,id:a},i));case"image":return Object(o.createElement)(C,m({key:n,id:a},i));case"custom":return Object(o.createElement)(B,m({key:n,id:a},i));default:return null}}))}),[n]);return a?Object(o.createElement)(o.Fragment,null,i):Object(o.createElement)("svg",{style:{bottom:0,height:1,opacity:0,pointerEvents:"none",position:"fixed",right:0,width:1,zIndex:-1}},i)}));var F=n(3),U=n(25),A=n(9),_=n.n(A),I=n(49),V=n(24),z=n.n(V),R=(n(97),n(98),n(99),function(t){var e=Object.assign({},t),n=Object(o.useMemo)((function(){return"pattern-".concat(Math.random().toString().substr(2))}),[]),a=Object(o.useState)(!1),i=Object(c.a)(a,2),s=i[0],l=i[1],f=Object(o.useCallback)((function(){l((function(t){return!t}))}),[]);return Object(r.jsxs)("svg",Object(F.a)(Object(F.a)({height:100,onClick:f,preserveAspectRatio:"none",viewBox:"0 0 100 100",width:100},e),{},{children:[s?Object(r.jsx)("defs",{children:Object(r.jsx)("pattern",{id:n,x:0,y:0,width:"100%",height:"100%",patternUnits:"userSpaceOnUse",patternContentUnits:"userSpaceOnUse",children:Object(r.jsx)("rect",{fill:"inherit",x:0,y:0,width:"100%",height:"100%"})})}):null,Object(r.jsx)(N,{}),Object(r.jsx)("g",{fill:s?"url(#".concat(n,")"):"inherit",children:Object(r.jsx)("rect",{x:5,y:5,width:90,height:90})})]}))});function D(){var t=Object(s.a)(["\n  display: grid;\n  grid-template-rows: min-content 0.5fr 0.5fr;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 1px;\n  background-color: #9f9f9f;\n  border-top: 1px solid #9f9f9f;\n  border-bottom: 1px solid #9f9f9f;\n\n  .typeSelect {\n    display: flex;\n    position: relative;\n    grid-row: 1 / 2;\n    grid-column: 1 / 2;\n\n    > label {\n      padding: 10px 20px;\n      color: #9f9f9f;\n      background-color: #e8e8e8;\n      border-right: 1px solid #9f9f9f;\n    }\n\n    > select {\n      appearance: none;\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 10px 20px;\n      box-sizing: border-box;\n      outline: 0;\n      border: 0;\n      border-radius: 0;\n      background-color: #fff;\n      color: inherit;\n      font: inherit;\n      cursor: pointer;\n\n      &:focus {\n        background-color: #e8f2fd;\n      }\n    }\n\n    &::after {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      padding: 10px;\n      pointer-events: none;\n      color: #9f9f9f;\n      content: '\u25be';\n    }\n  }\n\n  .optionsEditor {\n    grid-row: 2 / -2;\n    grid-column: 1 / 2;\n    height: 100%;\n  }\n\n  .patternPreview {\n    grid-row: 1 / -2;\n    grid-column: 2 / 3;\n    background-color: #fff;\n\n    > svg {\n      display: block;\n      width: 100%;\n      min-height: 100%;\n    }\n  }\n\n  .codeSample {\n    grid-row: -2 / -1;\n    grid-column: 1 / -1;\n  }\n"]);return D=function(){return t},t}var G=["linear","radial","angular","image","custom"],Y=G[Math.floor(Math.random()*G.length)],K={linear:"Linear Gradient",radial:"Radial Gradient",angular:"Angular Gradient",image:"Background Image",custom:"Custom"},H={linear:{from:"#009999",to:"#cc3366",angle:90},radial:{r:.71,stops:[{offset:0,color:"#330000"},{offset:.23,color:"#110000"},{offset:.24,color:"#cc6600"},{offset:.27,color:"#993300"},{offset:.34,color:"#660000"},{offset:.35,color:"#cc6600"},{offset:.4,color:"#993300"},{offset:.47,color:"#660000"},{offset:.48,color:"#cc6600"},{offset:.55,color:"#993300"},{offset:.64,color:"#660000"},{offset:.65,color:"#cc6600"},{offset:.74,color:"#993300"},{offset:.84,color:"#660000"},{offset:.85,color:"#cc6600"},{offset:.91,color:"#993300"},{offset:1,color:"#660000"}]},angular:{slices:200,stops:["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"]},image:{src:"https://via.placeholder.com/150"},custom:'<g transform="translate(0.5, 0.5) scale(1.42) rotate(-45) translate(-0.5, -0.5)">\n  <g>\n    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0, 0" to="0, -1" dur="5s" repeatCount="indefinite" />\n    <rect fill="#FD5068" x="0" y="0" width="1" height="1" />\n    <rect fill="#FC9B27" x="0" y="0.167" width="1" height="1" />\n    <rect fill="#FFDE4B" x="0" y="0.333" width="1" height="1" />\n    <rect fill="#3CCE9E" x="0" y="0.5" width="1" height="1" />\n    <rect fill="#429AEA" x="0" y="0.666" width="1" height="1" />\n    <rect fill="#7366D3" x="0" y="0.833" width="1" height="1" />\n    <rect fill="#FD5068" x="0" y="1" width="1" height="1" />\n    <rect fill="#FC9B27" x="0" y="1.167" width="1" height="1" />\n    <rect fill="#FFDE4B" x="0" y="1.333" width="1" height="1" />\n    <rect fill="#3CCE9E" x="0" y="1.5" width="1" height="1" />\n    <rect fill="#429AEA" x="0" y="1.666" width="1" height="1" />\n    <rect fill="#7366D3" x="0" y="1.833" width="1" height="1" />\n  </g>\n</g>\n'};function X(){function t(e){return"element"===e.type&&"svg"===e.tagName?e:e.children&&e.children.find((function(e){return t(e)}))}function e(e){var n=e&&t(e);return n?{type:"root",children:n.children}:e}return function(t){return e(t)}}function J(t){var e={window:{},document:{},globalThis:{},console:{},alert:function(){},fetch:function(){},XMLHttpRequest:void 0},n=Object.keys(e),r=n.map((function(t){return e[t]}));function o(e,o){var a=e.match(/^\{(.*)\}$/)||[e,void 0],i=Object(c.a)(a,2)[1];return null==i?e:function(e){if(e.trim())try{return new Function(["id"].concat(Object(U.a)(n)),"return (".concat(e,");")).apply(void 0,[t].concat(Object(U.a)(r))).toString()}catch(o){return console.error("failed to evaluate expression:",e),console.error(o),e}}(i)}function a(t){if(!t)return t;var e=Object(F.a)({},t);return e.children&&(e.children=t.children.map((function(t){return a(t)}))),e.properties&&(e.properties={},Object.entries(t.properties).forEach((function(t){var n=Object(c.a)(t,2),r=n[0],a=n[1];e.properties[r]=o(a)}))),"text"===e.type&&(e.value=o(e.value)),e}return function(t){return a(t)}}var W=function(t,e){var n;window.lastValue=t;try{n=Object(I.a)().use(X).use(J,e).processSync("<svg>".concat(t,"</svg>")).toString()}catch(o){n=t}return Object(r.jsx)("g",{dangerouslySetInnerHTML:{__html:n}})};function $(t,e){switch(e.type){case"SET_TYPE":var n=e.payload,r=H[n],o="string"===typeof r?{children:function(t){return W(r,t)}}:r,a="string"===typeof r?r:_.a.stringify(r,null,2)+"\n";return Object(F.a)(Object(F.a)({},t),{},{type:n,options:o,optionsValue:a});case"SET_OPTIONS_VALUE":var i=e.payload;try{var c="custom"===t.type?{children:function(t){return W(i,t)}}:_.a.parse(i);return Object(F.a)(Object(F.a)({},t),{},{options:c,optionsValue:i})}catch(s){return Object(F.a)(Object(F.a)({},t),{},{optionsValue:i})}default:return t}}var q=Object(l.c)((function(t){var e=t.className,n=t.onSetPatternId,a=t.patternKey,i=void 0===a?"demo":a,s=t.registerSvgPattern,l=Object(o.useReducer)($,{type:Y,options:"string"===typeof H[Y]?{children:function(t){return W(H[Y],t)}}:H[Y],optionsValue:"string"===typeof H[Y]?H[Y]:_.a.stringify(H[Y],null,2)+"\n"}),f=Object(c.a)(l,2),u=f[0],d=u.type,p=u.optionsValue,h=u.options,g=f[1],b=Object(o.useState)(""),m=Object(c.a)(b,2),v=m[0],j=m[1],y=Object(o.useMemo)((function(){var t,e=_.a.stringify(d);if("custom"===d)t="{\n  children: id => (\n    <g>\n".concat(p.split("\n").map((function(t){return"      ".concat(t)})).join("\n"),"\n    </g>\n  )\n}");else try{t=_.a.stringify(h,null,2)}catch(n){t=""}return"// Example Usage\nimport { createManagedSvgPatternLibrary } from 'react-svg-patterns';\n\nconst {\n  ManagedSvgPatternLibrary,\n  registerSvgPattern,\n} = createManagedSvgPatternLibrary();\n\n// Register pattern\nconst yourPatternId = registerSvgPattern('yourPatternKey', ".concat(e,", ").concat(t,");\n\n// Use pattern as a fill in a component\nconst YourSvgComponent = (...props) => (\n  <svg fill={yourPatternId} {...props}>\n    {/* shapes, etc. */}\n  </svg>\n);\n\n// Render ManagedSvgPatternLibrary component in your app\nconst YourApp = () => (\n  <>\n    <div>\n      <YourSvgComponent />\n    </div>\n    <ManagedSvgPatternLibrary />\n  </>\n);\n")}),[d,h,p]),O=Object(o.useCallback)((function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.currentTarget.value;g({type:"SET_TYPE",payload:e})}),[]),x=Object(o.useCallback)((function(t){g({type:"SET_OPTIONS_VALUE",payload:t})}),[]);Object(o.useEffect)((function(){var t=s(i,d,h);j(t),n&&n(t)}),[n,i,s,d,h]);var w="eclipse",M=Object(o.useMemo)((function(){return{$blockScrolling:!0}}),[]),S=Object(o.useMemo)((function(){return{showLineNumbers:!1,tabSize:2,showPrintMargin:!1,useSoftTabs:!0,useWorker:!1}}),[]);return Object(r.jsxs)("div",{className:e,children:[Object(r.jsxs)("div",{className:"typeSelect",children:[Object(r.jsx)("label",{children:"Type"}),Object(r.jsx)("select",{onChange:O,value:d,children:G.map((function(t){return Object(r.jsx)("option",{value:t,children:K[t]||t},t)}))})]}),Object(r.jsx)("div",{className:"optionsEditor",children:Object(r.jsx)(z.a,{editorProps:M,height:"100%",mode:"custom"===d?"svg":"javascript",name:"patternOptions",onChange:x,setOptions:S,theme:w,value:p,width:"100%"})}),Object(r.jsx)("div",{className:"patternPreview",children:Object(r.jsx)(R,{fill:v,preserveAspectRatio:"none"})}),Object(r.jsx)("div",{className:"codeSample",children:Object(r.jsx)(z.a,{editorProps:M,mode:"javascript",name:"sampleCode",height:"100%",readOnly:!0,setOptions:S,theme:w,value:y,width:"100%"})})]})}))(D());function Q(){var t=Object(s.a)(["\n  &:hover {\n    .octocat-arm {\n      animation: octocat-wave 560ms ease-in-out;\n    };\n  }\n\n  @keyframes octocat-wave {\n    0%, 100% {\n      transform: rotate(0);\n    }\n\n    20%, 60% {\n      transform: rotate(-25deg);\n    }\n\n    40%, 80% {\n      transform: rotate(10deg);\n    }\n  }\n\n  @media (max-width: 500px) {\n    .octocat-arm {\n      animation: octocat-wave 560ms ease-in-out;\n    }\n\n    &:hover .octocat-arm {\n      animation: none\n    }\n  }\n"]);return Q=function(){return t},t}var Z=Object(l.c)((function(t){var e=t.backgroundFill,n=void 0===e?"#151513":e,o=t.className,a=t.foregroundFill,i=void 0===a?"#fff":a,c=t.height,s=void 0===c?80:c,l=t.width,f=void 0===l?80:l;return Object(r.jsxs)("svg",{className:o,fill:n,height:s,viewBox:"0 0 250 250",width:f,xmlns:"http://www.w3.org/2000/svg",children:[Object(r.jsx)("path",{d:"M0 0l115 115h15l12 27 108 108V0z"}),Object(r.jsxs)("g",{className:"octocat",fill:i,children:[Object(r.jsx)("path",{className:"octocat-arm",d:"M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16",style:{transformOrigin:"130px 106px"}}),Object(r.jsx)("path",{className:"octocat-body",d:"M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"})]})]})}))(Q());function tt(){var t=Object(s.a)(["\n  main {\n    display: grid;\n    grid-template-rows: min-content auto min-content;\n    width: 100vw;\n    min-height: 100vh;\n  }\n\n  header {\n    padding: 20px 80px 20px 34px;\n    min-height: 100px;\n    box-sizing: border-box;\n  }\n\n  h1 {\n    font-weight: bold;\n    font-size: 2rem;\n    margin-bottom: 10px;\n  }\n\n  code {\n    font-family: monospace;\n  }\n\n  aside {\n    position: fixed;\n    top: 0;\n    right: 0;\n\n    a,\n    svg {\n      display: block;\n    }\n  }\n\n  footer {\n    padding: 20px 34px;\n    font-size: 0.8rem;\n    text-align: center;\n    box-sizing: border-box;\n  }\n\n  p:not(:last-child) {\n    margin-bottom: 10px;\n  }\n"]);return tt=function(){return t},t}function et(){var t=Object(s.a)(["\n  ","\n\n  html,\n  body {\n    margin: 0;\n    padding: 0;\n  }\n\n  body {\n    font-family: sans-serif;\n    color: #000;\n    background-color: #fff;\n  }\n\n  a {\n    color: #36f;\n\n    &:hover {\n      color: #69f;\n    }\n\n    &:active {\n      color: #69f;\n    }\n  }\n"]);return et=function(){return t},t}var nt=Object(l.a)(et(),f.a),rt=function(t){var e=t instanceof T?t:new T(t);return{ManagedSvgPatternLibrary:function(t){var n=v(Object(o.useState)(e.getPatterns()),2),r=n[0],a=n[1];return Object(o.useEffect)((function(){a(e.getPatterns());var t=e.subscribe((function(){a(e.getPatterns())}));return function(){t()}}),[]),Object(o.createElement)(L,m({patterns:r},t))},getSvgPattern:function(t){return e.get(t)},registerSvgPattern:function(t,n,r){return e.get(e.add(t,n,r))},useSvgPattern:function(t,n,r){var a=v(Object(o.useState)(void 0),2),i=a[0],c=a[1];return Object(o.useLayoutEffect)((function(){c(e.get(e.add(t,n,r)))}),[t,n,r]),i}}}(),ot=rt.ManagedSvgPatternLibrary,at=rt.registerSvgPattern,it=Object(l.c)((function(t){var e=t.className,n=Object(o.useState)(),a=Object(c.a)(n,2),i=a[0],s=a[1],l=Object(o.useCallback)((function(t){s(t)}),[]);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(nt,{}),Object(r.jsxs)("div",{className:e,children:[Object(r.jsxs)("main",{children:[Object(r.jsxs)("header",{children:[Object(r.jsx)("h1",{children:"React SVG Pattern Manager"}),Object(r.jsx)("p",{children:"Create, manage, and use SVG patterns in your React components!"})]}),Object(r.jsx)(q,{onSetPatternId:l,patternKey:"demo",registerSvgPattern:at}),Object(r.jsxs)("footer",{children:[Object(r.jsx)("p",{children:Object(r.jsxs)("code",{children:[Object(r.jsx)("a",{href:"https://www.npmjs.com/package/react-svg-patterns",target:"_blank",children:"react-svg-patterns"}),"@".concat("0.5.0")]})}),Object(r.jsxs)("p",{children:["\xa9 2019","-".concat(Math.max(2021,(new Date).getFullYear())," "),Object(r.jsx)("a",{href:"https://mcknig.ht",target:"_blank",children:"Keith McKnight"})]})]})]}),Object(r.jsx)("aside",{children:Object(r.jsx)("a",{href:"https://github.com/kmck/react-svg-patterns",target:"_blank",children:Object(r.jsx)(Z,{backgroundFill:i})})})]}),Object(r.jsx)(ot,{idPrefix:"libraryDemo"})]})}))(tt());i.a.render(Object(r.jsx)(it,{}),document.getElementById("root"))}},[[100,1,2]]]);
//# sourceMappingURL=main.4c7f6759.chunk.js.map