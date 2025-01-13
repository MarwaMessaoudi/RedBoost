import{r as gt,e as he,R as It,P as Pt}from"./index-CJ-wuhK9.js";var j="top",L="bottom",S="right",B="left",Ct="auto",ft=[j,L,S,B],K="start",it="end",me="clippingParents",_t="viewport",nt="popper",ge="reference",Xt=ft.reduce(function(t,e){return t.concat([e+"-"+K,e+"-"+it])},[]),te=[].concat(ft,[Ct]).reduce(function(t,e){return t.concat([e,e+"-"+K,e+"-"+it])},[]),ye="beforeRead",be="read",we="afterRead",xe="beforeMain",Oe="main",Ee="afterMain",Pe="beforeWrite",Ae="write",Re="afterWrite",Ce=[ye,be,we,xe,Oe,Ee,Pe,Ae,Re];function V(t){return t?(t.nodeName||"").toLowerCase():null}function T(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function G(t){var e=T(t).Element;return t instanceof e||t instanceof Element}function k(t){var e=T(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Dt(t){if(typeof ShadowRoot>"u")return!1;var e=T(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function De(t){var e=t.state;Object.keys(e.elements).forEach(function(r){var n=e.styles[r]||{},a=e.attributes[r]||{},o=e.elements[r];!k(o)||!V(o)||(Object.assign(o.style,n),Object.keys(a).forEach(function(f){var i=a[f];i===!1?o.removeAttribute(f):o.setAttribute(f,i===!0?"":i)}))})}function je(t){var e=t.state,r={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,r.popper),e.styles=r,e.elements.arrow&&Object.assign(e.elements.arrow.style,r.arrow),function(){Object.keys(e.elements).forEach(function(n){var a=e.elements[n],o=e.attributes[n]||{},f=Object.keys(e.styles.hasOwnProperty(n)?e.styles[n]:r[n]),i=f.reduce(function(s,c){return s[c]="",s},{});!k(a)||!V(a)||(Object.assign(a.style,i),Object.keys(o).forEach(function(s){a.removeAttribute(s)}))})}}const Be={name:"applyStyles",enabled:!0,phase:"write",fn:De,effect:je,requires:["computeStyles"]};function H(t){return t.split("-")[0]}var Z=Math.max,yt=Math.min,Q=Math.round;function At(){var t=navigator.userAgentData;return t!=null&&t.brands&&Array.isArray(t.brands)?t.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function ee(){return!/^((?!chrome|android).)*safari/i.test(At())}function _(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!1);var n=t.getBoundingClientRect(),a=1,o=1;e&&k(t)&&(a=t.offsetWidth>0&&Q(n.width)/t.offsetWidth||1,o=t.offsetHeight>0&&Q(n.height)/t.offsetHeight||1);var f=G(t)?T(t):window,i=f.visualViewport,s=!ee()&&r,c=(n.left+(s&&i?i.offsetLeft:0))/a,p=(n.top+(s&&i?i.offsetTop:0))/o,h=n.width/a,y=n.height/o;return{width:h,height:y,top:p,right:c+h,bottom:p+y,left:c,x:c,y:p}}function jt(t){var e=_(t),r=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:n}}function re(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&Dt(r)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function N(t){return T(t).getComputedStyle(t)}function $e(t){return["table","td","th"].indexOf(V(t))>=0}function q(t){return((G(t)?t.ownerDocument:t.document)||window.document).documentElement}function bt(t){return V(t)==="html"?t:t.assignedSlot||t.parentNode||(Dt(t)?t.host:null)||q(t)}function Yt(t){return!k(t)||N(t).position==="fixed"?null:t.offsetParent}function Te(t){var e=/firefox/i.test(At()),r=/Trident/i.test(At());if(r&&k(t)){var n=N(t);if(n.position==="fixed")return null}var a=bt(t);for(Dt(a)&&(a=a.host);k(a)&&["html","body"].indexOf(V(a))<0;){var o=N(a);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||e&&o.willChange==="filter"||e&&o.filter&&o.filter!=="none")return a;a=a.parentNode}return null}function pt(t){for(var e=T(t),r=Yt(t);r&&$e(r)&&N(r).position==="static";)r=Yt(r);return r&&(V(r)==="html"||V(r)==="body"&&N(r).position==="static")?e:r||Te(t)||e}function Bt(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function at(t,e,r){return Z(t,yt(e,r))}function ke(t,e,r){var n=at(t,e,r);return n>r?r:n}function ne(){return{top:0,right:0,bottom:0,left:0}}function ae(t){return Object.assign({},ne(),t)}function oe(t,e){return e.reduce(function(r,n){return r[n]=t,r},{})}var Le=function(e,r){return e=typeof e=="function"?e(Object.assign({},r.rects,{placement:r.placement})):e,ae(typeof e!="number"?e:oe(e,ft))};function Se(t){var e,r=t.state,n=t.name,a=t.options,o=r.elements.arrow,f=r.modifiersData.popperOffsets,i=H(r.placement),s=Bt(i),c=[B,S].indexOf(i)>=0,p=c?"height":"width";if(!(!o||!f)){var h=Le(a.padding,r),y=jt(o),u=s==="y"?j:B,w=s==="y"?L:S,d=r.rects.reference[p]+r.rects.reference[s]-f[s]-r.rects.popper[p],v=f[s]-r.rects.reference[s],b=pt(o),O=b?s==="y"?b.clientHeight||0:b.clientWidth||0:0,E=d/2-v/2,l=h[u],m=O-y[p]-h[w],g=O/2-y[p]/2+E,x=at(l,g,m),R=s;r.modifiersData[n]=(e={},e[R]=x,e.centerOffset=x-g,e)}}function Me(t){var e=t.state,r=t.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=e.elements.popper.querySelector(a),!a)||re(e.elements.popper,a)&&(e.elements.arrow=a))}const We={name:"arrow",enabled:!0,phase:"main",fn:Se,effect:Me,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function tt(t){return t.split("-")[1]}var He={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Ve(t,e){var r=t.x,n=t.y,a=e.devicePixelRatio||1;return{x:Q(r*a)/a||0,y:Q(n*a)/a||0}}function zt(t){var e,r=t.popper,n=t.popperRect,a=t.placement,o=t.variation,f=t.offsets,i=t.position,s=t.gpuAcceleration,c=t.adaptive,p=t.roundOffsets,h=t.isFixed,y=f.x,u=y===void 0?0:y,w=f.y,d=w===void 0?0:w,v=typeof p=="function"?p({x:u,y:d}):{x:u,y:d};u=v.x,d=v.y;var b=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),E=B,l=j,m=window;if(c){var g=pt(r),x="clientHeight",R="clientWidth";if(g===T(r)&&(g=q(r),N(g).position!=="static"&&i==="absolute"&&(x="scrollHeight",R="scrollWidth")),g=g,a===j||(a===B||a===S)&&o===it){l=L;var A=h&&g===m&&m.visualViewport?m.visualViewport.height:g[x];d-=A-n.height,d*=s?1:-1}if(a===B||(a===j||a===L)&&o===it){E=S;var P=h&&g===m&&m.visualViewport?m.visualViewport.width:g[R];u-=P-n.width,u*=s?1:-1}}var C=Object.assign({position:i},c&&He),M=p===!0?Ve({x:u,y:d},T(r)):{x:u,y:d};if(u=M.x,d=M.y,s){var D;return Object.assign({},C,(D={},D[l]=O?"0":"",D[E]=b?"0":"",D.transform=(m.devicePixelRatio||1)<=1?"translate("+u+"px, "+d+"px)":"translate3d("+u+"px, "+d+"px, 0)",D))}return Object.assign({},C,(e={},e[l]=O?d+"px":"",e[E]=b?u+"px":"",e.transform="",e))}function Ne(t){var e=t.state,r=t.options,n=r.gpuAcceleration,a=n===void 0?!0:n,o=r.adaptive,f=o===void 0?!0:o,i=r.roundOffsets,s=i===void 0?!0:i,c={placement:H(e.placement),variation:tt(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:a,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,zt(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:f,roundOffsets:s})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,zt(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const Fe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Ne,data:{}};var ht={passive:!0};function qe(t){var e=t.state,r=t.instance,n=t.options,a=n.scroll,o=a===void 0?!0:a,f=n.resize,i=f===void 0?!0:f,s=T(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach(function(p){p.addEventListener("scroll",r.update,ht)}),i&&s.addEventListener("resize",r.update,ht),function(){o&&c.forEach(function(p){p.removeEventListener("scroll",r.update,ht)}),i&&s.removeEventListener("resize",r.update,ht)}}const Ie={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:qe,data:{}};var Xe={left:"right",right:"left",bottom:"top",top:"bottom"};function mt(t){return t.replace(/left|right|bottom|top/g,function(e){return Xe[e]})}var Ye={start:"end",end:"start"};function Ut(t){return t.replace(/start|end/g,function(e){return Ye[e]})}function $t(t){var e=T(t),r=e.pageXOffset,n=e.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Tt(t){return _(q(t)).left+$t(t).scrollLeft}function ze(t,e){var r=T(t),n=q(t),a=r.visualViewport,o=n.clientWidth,f=n.clientHeight,i=0,s=0;if(a){o=a.width,f=a.height;var c=ee();(c||!c&&e==="fixed")&&(i=a.offsetLeft,s=a.offsetTop)}return{width:o,height:f,x:i+Tt(t),y:s}}function Ue(t){var e,r=q(t),n=$t(t),a=(e=t.ownerDocument)==null?void 0:e.body,o=Z(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),f=Z(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),i=-n.scrollLeft+Tt(t),s=-n.scrollTop;return N(a||r).direction==="rtl"&&(i+=Z(r.clientWidth,a?a.clientWidth:0)-o),{width:o,height:f,x:i,y:s}}function kt(t){var e=N(t),r=e.overflow,n=e.overflowX,a=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}function ie(t){return["html","body","#document"].indexOf(V(t))>=0?t.ownerDocument.body:k(t)&&kt(t)?t:ie(bt(t))}function ot(t,e){var r;e===void 0&&(e=[]);var n=ie(t),a=n===((r=t.ownerDocument)==null?void 0:r.body),o=T(n),f=a?[o].concat(o.visualViewport||[],kt(n)?n:[]):n,i=e.concat(f);return a?i:i.concat(ot(bt(f)))}function Rt(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Ze(t,e){var r=_(t,!1,e==="fixed");return r.top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r}function Zt(t,e,r){return e===_t?Rt(ze(t,r)):G(e)?Ze(e,r):Rt(Ue(q(t)))}function Ge(t){var e=ot(bt(t)),r=["absolute","fixed"].indexOf(N(t).position)>=0,n=r&&k(t)?pt(t):t;return G(n)?e.filter(function(a){return G(a)&&re(a,n)&&V(a)!=="body"}):[]}function Je(t,e,r,n){var a=e==="clippingParents"?Ge(t):[].concat(e),o=[].concat(a,[r]),f=o[0],i=o.reduce(function(s,c){var p=Zt(t,c,n);return s.top=Z(p.top,s.top),s.right=yt(p.right,s.right),s.bottom=yt(p.bottom,s.bottom),s.left=Z(p.left,s.left),s},Zt(t,f,n));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}function se(t){var e=t.reference,r=t.element,n=t.placement,a=n?H(n):null,o=n?tt(n):null,f=e.x+e.width/2-r.width/2,i=e.y+e.height/2-r.height/2,s;switch(a){case j:s={x:f,y:e.y-r.height};break;case L:s={x:f,y:e.y+e.height};break;case S:s={x:e.x+e.width,y:i};break;case B:s={x:e.x-r.width,y:i};break;default:s={x:e.x,y:e.y}}var c=a?Bt(a):null;if(c!=null){var p=c==="y"?"height":"width";switch(o){case K:s[c]=s[c]-(e[p]/2-r[p]/2);break;case it:s[c]=s[c]+(e[p]/2-r[p]/2);break}}return s}function st(t,e){e===void 0&&(e={});var r=e,n=r.placement,a=n===void 0?t.placement:n,o=r.strategy,f=o===void 0?t.strategy:o,i=r.boundary,s=i===void 0?me:i,c=r.rootBoundary,p=c===void 0?_t:c,h=r.elementContext,y=h===void 0?nt:h,u=r.altBoundary,w=u===void 0?!1:u,d=r.padding,v=d===void 0?0:d,b=ae(typeof v!="number"?v:oe(v,ft)),O=y===nt?ge:nt,E=t.rects.popper,l=t.elements[w?O:y],m=Je(G(l)?l:l.contextElement||q(t.elements.popper),s,p,f),g=_(t.elements.reference),x=se({reference:g,element:E,strategy:"absolute",placement:a}),R=Rt(Object.assign({},E,x)),A=y===nt?R:g,P={top:m.top-A.top+b.top,bottom:A.bottom-m.bottom+b.bottom,left:m.left-A.left+b.left,right:A.right-m.right+b.right},C=t.modifiersData.offset;if(y===nt&&C){var M=C[a];Object.keys(P).forEach(function(D){var I=[S,L].indexOf(D)>=0?1:-1,X=[j,L].indexOf(D)>=0?"y":"x";P[D]+=M[X]*I})}return P}function Ke(t,e){e===void 0&&(e={});var r=e,n=r.placement,a=r.boundary,o=r.rootBoundary,f=r.padding,i=r.flipVariations,s=r.allowedAutoPlacements,c=s===void 0?te:s,p=tt(n),h=p?i?Xt:Xt.filter(function(w){return tt(w)===p}):ft,y=h.filter(function(w){return c.indexOf(w)>=0});y.length===0&&(y=h);var u=y.reduce(function(w,d){return w[d]=st(t,{placement:d,boundary:a,rootBoundary:o,padding:f})[H(d)],w},{});return Object.keys(u).sort(function(w,d){return u[w]-u[d]})}function Qe(t){if(H(t)===Ct)return[];var e=mt(t);return[Ut(t),e,Ut(e)]}function _e(t){var e=t.state,r=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var a=r.mainAxis,o=a===void 0?!0:a,f=r.altAxis,i=f===void 0?!0:f,s=r.fallbackPlacements,c=r.padding,p=r.boundary,h=r.rootBoundary,y=r.altBoundary,u=r.flipVariations,w=u===void 0?!0:u,d=r.allowedAutoPlacements,v=e.options.placement,b=H(v),O=b===v,E=s||(O||!w?[mt(v)]:Qe(v)),l=[v].concat(E).reduce(function(J,F){return J.concat(H(F)===Ct?Ke(e,{placement:F,boundary:p,rootBoundary:h,padding:c,flipVariations:w,allowedAutoPlacements:d}):F)},[]),m=e.rects.reference,g=e.rects.popper,x=new Map,R=!0,A=l[0],P=0;P<l.length;P++){var C=l[P],M=H(C),D=tt(C)===K,I=[j,L].indexOf(M)>=0,X=I?"width":"height",$=st(e,{placement:C,boundary:p,rootBoundary:h,altBoundary:y,padding:c}),W=I?D?S:B:D?L:j;m[X]>g[X]&&(W=mt(W));var ct=mt(W),Y=[];if(o&&Y.push($[M]<=0),i&&Y.push($[W]<=0,$[ct]<=0),Y.every(function(J){return J})){A=C,R=!1;break}x.set(C,Y)}if(R)for(var ut=w?3:1,wt=function(F){var rt=l.find(function(vt){var z=x.get(vt);if(z)return z.slice(0,F).every(function(xt){return xt})});if(rt)return A=rt,"break"},et=ut;et>0;et--){var lt=wt(et);if(lt==="break")break}e.placement!==A&&(e.modifiersData[n]._skip=!0,e.placement=A,e.reset=!0)}}const tr={name:"flip",enabled:!0,phase:"main",fn:_e,requiresIfExists:["offset"],data:{_skip:!1}};function Gt(t,e,r){return r===void 0&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function Jt(t){return[j,S,L,B].some(function(e){return t[e]>=0})}function er(t){var e=t.state,r=t.name,n=e.rects.reference,a=e.rects.popper,o=e.modifiersData.preventOverflow,f=st(e,{elementContext:"reference"}),i=st(e,{altBoundary:!0}),s=Gt(f,n),c=Gt(i,a,o),p=Jt(s),h=Jt(c);e.modifiersData[r]={referenceClippingOffsets:s,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:h},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":h})}const rr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:er};function nr(t,e,r){var n=H(t),a=[B,j].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},e,{placement:t})):r,f=o[0],i=o[1];return f=f||0,i=(i||0)*a,[B,S].indexOf(n)>=0?{x:i,y:f}:{x:f,y:i}}function ar(t){var e=t.state,r=t.options,n=t.name,a=r.offset,o=a===void 0?[0,0]:a,f=te.reduce(function(p,h){return p[h]=nr(h,e.rects,o),p},{}),i=f[e.placement],s=i.x,c=i.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=s,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=f}const or={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:ar};function ir(t){var e=t.state,r=t.name;e.modifiersData[r]=se({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}const sr={name:"popperOffsets",enabled:!0,phase:"read",fn:ir,data:{}};function fr(t){return t==="x"?"y":"x"}function pr(t){var e=t.state,r=t.options,n=t.name,a=r.mainAxis,o=a===void 0?!0:a,f=r.altAxis,i=f===void 0?!1:f,s=r.boundary,c=r.rootBoundary,p=r.altBoundary,h=r.padding,y=r.tether,u=y===void 0?!0:y,w=r.tetherOffset,d=w===void 0?0:w,v=st(e,{boundary:s,rootBoundary:c,padding:h,altBoundary:p}),b=H(e.placement),O=tt(e.placement),E=!O,l=Bt(b),m=fr(l),g=e.modifiersData.popperOffsets,x=e.rects.reference,R=e.rects.popper,A=typeof d=="function"?d(Object.assign({},e.rects,{placement:e.placement})):d,P=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),C=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,M={x:0,y:0};if(g){if(o){var D,I=l==="y"?j:B,X=l==="y"?L:S,$=l==="y"?"height":"width",W=g[l],ct=W+v[I],Y=W-v[X],ut=u?-R[$]/2:0,wt=O===K?x[$]:R[$],et=O===K?-R[$]:-x[$],lt=e.elements.arrow,J=u&&lt?jt(lt):{width:0,height:0},F=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:ne(),rt=F[I],vt=F[X],z=at(0,x[$],J[$]),xt=E?x[$]/2-ut-z-rt-P.mainAxis:wt-z-rt-P.mainAxis,pe=E?-x[$]/2+ut+z+vt+P.mainAxis:et+z+vt+P.mainAxis,Ot=e.elements.arrow&&pt(e.elements.arrow),ce=Ot?l==="y"?Ot.clientTop||0:Ot.clientLeft||0:0,Lt=(D=C==null?void 0:C[l])!=null?D:0,ue=W+xt-Lt-ce,le=W+pe-Lt,St=at(u?yt(ct,ue):ct,W,u?Z(Y,le):Y);g[l]=St,M[l]=St-W}if(i){var Mt,ve=l==="x"?j:B,de=l==="x"?L:S,U=g[m],dt=m==="y"?"height":"width",Wt=U+v[ve],Ht=U-v[de],Et=[j,B].indexOf(b)!==-1,Vt=(Mt=C==null?void 0:C[m])!=null?Mt:0,Nt=Et?Wt:U-x[dt]-R[dt]-Vt+P.altAxis,Ft=Et?U+x[dt]+R[dt]-Vt-P.altAxis:Ht,qt=u&&Et?ke(Nt,U,Ft):at(u?Nt:Wt,U,u?Ft:Ht);g[m]=qt,M[m]=qt-U}e.modifiersData[n]=M}}const cr={name:"preventOverflow",enabled:!0,phase:"main",fn:pr,requiresIfExists:["offset"]};function ur(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function lr(t){return t===T(t)||!k(t)?$t(t):ur(t)}function vr(t){var e=t.getBoundingClientRect(),r=Q(e.width)/t.offsetWidth||1,n=Q(e.height)/t.offsetHeight||1;return r!==1||n!==1}function dr(t,e,r){r===void 0&&(r=!1);var n=k(e),a=k(e)&&vr(e),o=q(e),f=_(t,a,r),i={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(n||!n&&!r)&&((V(e)!=="body"||kt(o))&&(i=lr(e)),k(e)?(s=_(e,!0),s.x+=e.clientLeft,s.y+=e.clientTop):o&&(s.x=Tt(o))),{x:f.left+i.scrollLeft-s.x,y:f.top+i.scrollTop-s.y,width:f.width,height:f.height}}function hr(t){var e=new Map,r=new Set,n=[];t.forEach(function(o){e.set(o.name,o)});function a(o){r.add(o.name);var f=[].concat(o.requires||[],o.requiresIfExists||[]);f.forEach(function(i){if(!r.has(i)){var s=e.get(i);s&&a(s)}}),n.push(o)}return t.forEach(function(o){r.has(o.name)||a(o)}),n}function mr(t){var e=hr(t);return Ce.reduce(function(r,n){return r.concat(e.filter(function(a){return a.phase===n}))},[])}function gr(t){var e;return function(){return e||(e=new Promise(function(r){Promise.resolve().then(function(){e=void 0,r(t())})})),e}}function yr(t){var e=t.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(e).map(function(r){return e[r]})}var Kt={placement:"bottom",modifiers:[],strategy:"absolute"};function Qt(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function br(t){t===void 0&&(t={});var e=t,r=e.defaultModifiers,n=r===void 0?[]:r,a=e.defaultOptions,o=a===void 0?Kt:a;return function(i,s,c){c===void 0&&(c=o);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},Kt,o),modifiersData:{},elements:{reference:i,popper:s},attributes:{},styles:{}},h=[],y=!1,u={state:p,setOptions:function(b){var O=typeof b=="function"?b(p.options):b;d(),p.options=Object.assign({},o,p.options,O),p.scrollParents={reference:G(i)?ot(i):i.contextElement?ot(i.contextElement):[],popper:ot(s)};var E=mr(yr([].concat(n,p.options.modifiers)));return p.orderedModifiers=E.filter(function(l){return l.enabled}),w(),u.update()},forceUpdate:function(){if(!y){var b=p.elements,O=b.reference,E=b.popper;if(Qt(O,E)){p.rects={reference:dr(O,pt(E),p.options.strategy==="fixed"),popper:jt(E)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(P){return p.modifiersData[P.name]=Object.assign({},P.data)});for(var l=0;l<p.orderedModifiers.length;l++){if(p.reset===!0){p.reset=!1,l=-1;continue}var m=p.orderedModifiers[l],g=m.fn,x=m.options,R=x===void 0?{}:x,A=m.name;typeof g=="function"&&(p=g({state:p,options:R,name:A,instance:u})||p)}}}},update:gr(function(){return new Promise(function(v){u.forceUpdate(),v(p)})}),destroy:function(){d(),y=!0}};if(!Qt(i,s))return u;u.setOptions(c).then(function(v){!y&&c.onFirstUpdate&&c.onFirstUpdate(v)});function w(){p.orderedModifiers.forEach(function(v){var b=v.name,O=v.options,E=O===void 0?{}:O,l=v.effect;if(typeof l=="function"){var m=l({state:p,name:b,instance:u,options:E}),g=function(){};h.push(m||g)}})}function d(){h.forEach(function(v){return v()}),h=[]}return u}}var wr=[Ie,sr,Fe,Be,or,tr,cr,We,rr],xr=br({defaultModifiers:wr}),Or=function(t){return t?typeof t=="function"?t():t:document.body},fe=function(t){var e=t.children,r=t.container,n=t.portal,a=gt.useState(null),o=a[0],f=a[1];return gt.useEffect(function(){n&&f(Or(r)||document.body)},[r,n]),typeof window<"u"&&n&&o?he.createPortal(e,o):It.createElement(It.Fragment,null,e)};fe.propTypes={children:Pt.node,container:Pt.any,portal:Pt.bool.isRequired};fe.displayName="CConditionalPortal";var Pr=function(){var t=gt.useRef(),e=gt.useRef(),r=function(o,f,i){t.current=xr(o,f,i),e.current=f},n=function(){var o=t.current;o&&e.current&&o.destroy(),t.current=void 0},a=function(o){var f=t.current;f&&o&&f.setOptions(o),f&&f.update()};return{popper:t.current,initPopper:r,destroyPopper:n,updatePopper:a}},Ar=function(t){return typeof document<"u"&&document.documentElement.dir==="rtl"?!0:t?t.closest('[dir="rtl"]')!==null:!1},Rr=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"];export{fe as C,Rr as c,Ar as i,Pr as u};
